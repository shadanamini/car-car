# CarCar

Team:

* Shadan - Sales
* Emma - Service: in localhost:8080/admin, Statuses should have 3 data.  id:1 name: SCHEDULED, id:2 name: CANCELLED, id:3 name: FINISHED 

## Design

## Service microservice

There are three models in the automobile service, which include technician, appointment, and automobile VO.  

Technician is an entity.  It has an identity and lifecycle but represents data points with behavior.  Technician model lives by itself and is assigned an appointment.  Technician doesn’t own the appointment.  Even if a technician is sick some day, it doesn’t mean that appointment does not exist anymore.  Appointment can be just assigned to a different technician.  Therefore, technician is not part of any aggregate. 

Although it’s not the model, the automobile owner is also an entity.  It has an identity and a lifecycle.  

Appointment is an entity, but it comes into existence from the association of other entities.  Technicians, automobile, and customers can exist on their own, but appointments can be created only when all three other entities exist.  Appointment is also an aggregate root.  Service history presents previous appointments.  Service history can’t exist without appointment.  Appointment and service history together are aggregates.   Appointment data represents an important transaction in the system that reserves date and time for technician and automobile to engage in service, but the appointment itself is self-sufficient.  Service doesn’t exist until that specific date and time.  Service is independent of appointment.  When the date and time arrives, the appointment goes away.  It is finished as a living object, then service becomes the living object between technician and automobile relationship.  

Automobile VO is a value object in the project for other microservices.  It can’t exist on its own, because it only exists after polling data from the Automobile model from Inventory microservice.  This is where integration comes in between Service microservice and Inventory microservice.  Automobile VO polls the VIN data from Automobiles in Inventory microservice.  If VIN in the appointment matches with VIN in Automobile VO, the automobile owner is flagged as a VIP.  Automobile VO is an entity in the Service microservice.  It has an identity, lifecycle, and is mutable in the Service microservice.

In the Service microservice, appointment, service history, and technician are in a bounded context.  They belong together to provide a consistent workflow in the problem domain.  Automobiles and owners are in a separate bounded context called customer context.  This is all about customer information and the life cycle that occurs there. 

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

I began building my microservice by creating several models. There were models for the sales person of the dealership (properties include employee name and number), the potential customer (properties include customer name, address and phone number), and a sales model (properties include foreign key relationships to other models as well as an individual sales price). I then created the views to generate the components in Insomnia. These were for individual or list of customers, individual or list of sales persons, and individual or list of sales. After completing the views, I then configured the URLs and began working on the front end portion of the sales microservice. Several forms were created and used to generate new sales person, new customer, as well as a new sale and list of sales.