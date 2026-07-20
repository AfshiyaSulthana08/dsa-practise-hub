package org.example.dsa_practice_hub_backend.service;


import org.example.dsa_practice_hub_backend.entity.ProblemEntity;
import org.example.dsa_practice_hub_backend.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository repository;

    public List<ProblemEntity> getAllProblems() {
        return repository.findAll();
    }

    public ProblemEntity getProblem(Long id) {
        return repository.findById(id).orElse(null);
    }

    public ProblemEntity addProblem(ProblemEntity problem) {
        return repository.save(problem);
    }

    public ProblemEntity updateProblem(Long id, ProblemEntity updatedProblem) {

        ProblemEntity problem = repository.findById(id).orElse(null);

        if (problem != null) {

            problem.setName(updatedProblem.getName());
            problem.setDifficulty(updatedProblem.getDifficulty());
            problem.setPlatform(updatedProblem.getPlatform());
            problem.setDate(updatedProblem.getDate());
            problem.setCompleted(updatedProblem.isCompleted());

            return repository.save(problem);
        }

        return null;
    }

    public void deleteProblem(Long id) {
        repository.deleteById(id);
    }
}