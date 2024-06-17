package naichinger.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Link{
    @Id
    public String shortHand; 
    public String url; 
}
