package naichinger.entity.dtos;

public class CreateLinkBody {
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public CreateLinkBody(String url) {
        this.url = url;
    }

    public CreateLinkBody() {
    }    
}
