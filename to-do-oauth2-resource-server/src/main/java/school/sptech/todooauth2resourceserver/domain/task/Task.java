package school.sptech.todooauth2resourceserver.domain.task;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name", nullable = false, length = 50)
  private String name;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "status", nullable = false, length = 15)
  private TaskStatusEnum status = TaskStatusEnum.NOT_STARTED;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "priority", length = 15)
  private TaskPriorityEnum priority;

  @Column(name = "due_date")
  private LocalDateTime dueDate;

  @CreationTimestamp
  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @Column(name = "completed_date")
  private LocalDateTime completedDate;
}
