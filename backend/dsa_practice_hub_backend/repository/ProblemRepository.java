package org.example.dsa_practice_hub_backend.repository;

import org.example.dsa_practice_hub_backend.entity.ProblemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<ProblemEntity, Long> {

}