package org.example.dsa_practice_hub_backend.controller;

import org.example.dsa_practice_hub_backend.entity.ProblemEntity;
import org.example.dsa_practice_hub_backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/problems")
public class ProblemController {

    @Autowired
    private ProblemService service;

    @GetMapping
    public List<ProblemEntity> getAllProblems() {
        return service.getAllProblems();
    }

    @GetMapping("/{id}")
    public ProblemEntity getProblem(@PathVariable Long id) {
        return service.getProblem(id);
    }

    @PostMapping
    public ProblemEntity addProblem(@RequestBody ProblemEntity problem) {
        return service.addProblem(problem);
    }

    @PutMapping("/{id}")
    public ProblemEntity updateProblem(@PathVariable Long id,
                                       @RequestBody ProblemEntity problem) {
        return service.updateProblem(id, problem);
    }

    @DeleteMapping("/{id}")
    public void deleteProblem(@PathVariable Long id) {
        service.deleteProblem(id);
    }
}