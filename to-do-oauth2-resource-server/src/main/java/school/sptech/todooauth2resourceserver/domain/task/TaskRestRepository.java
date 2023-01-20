package school.sptech.todooauth2resourceserver.domain.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "${FRONT_END_URI}")
@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRestRepository extends JpaRepository<Task, Long> {
  
}
