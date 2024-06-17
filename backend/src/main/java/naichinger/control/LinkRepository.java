package naichinger.control;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import naichinger.entity.Link;


@ApplicationScoped
public class LinkRepository implements PanacheRepositoryBase<Link, String> {
    
}
