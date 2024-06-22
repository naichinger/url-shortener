package naichinger.boundary;

import java.util.Random;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import naichinger.control.LinkRepository;
import naichinger.entity.Link;
import naichinger.entity.dtos.CreateLinkBody;

@Path("")
public class LinkController {

    private static int MAX_FIND_SHORTHAND_TRY_COUNT = 1000;

    @Inject
    LinkRepository repo;
    
    @ConfigProperty(name = "shortener.frontend_url") 
    String frontendUrl;
    
    Random random = new Random();
    
    @GET
    @Path("{shortHand}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getRedirect(@PathParam("shortHand") String shortHand) {
        Link l = repo.findById(shortHand);
        if(l == null) {
            return Response.status(301).header("Location", frontendUrl + "?s=notfound").build();
        }
        return Response.status(301).header("Location", l.url).build();
    }

    @POST
    @Path("api/link/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createLink(CreateLinkBody linkBody) {
        int tryCount = 0;
        String shortHand = "";
        do {
            shortHand = getRandomString(5);
            tryCount++;
        } while (repo.findById(shortHand) != null && tryCount < MAX_FIND_SHORTHAND_TRY_COUNT);

        if (tryCount >= MAX_FIND_SHORTHAND_TRY_COUNT) {
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }

        Link newLink = new Link();
        newLink.url = linkBody.getUrl();
        newLink.shortHand = shortHand;

        repo.persist(newLink);
        return Response.ok(newLink).build();
    }

    private String getRandomString(int length) {
        String chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            builder.append(chars.charAt(random.nextInt(chars.length())));
        }
        return builder.toString();
    }
}
