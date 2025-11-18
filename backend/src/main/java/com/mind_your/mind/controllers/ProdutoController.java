package com.mind_your.mind.controllers;

import com.mind_your.mind.models.Produto;
import com.mind_your.mind.repository.ProdutoRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    // Página Thymeleaf
    @GetMapping
    public String listar(Model model) {
        List<Produto> produtos = repository.findAll();
        model.addAttribute("produtos", produtos);
        return "produtos"; // busca templates/produtos.html
    }

    // API REST
    @GetMapping("/api")
    @ResponseBody
    public List<Produto> listarApi() {
        return repository.findAll();
    }

    @PostMapping("/api")
    @ResponseBody
    public Produto criar(@RequestBody Produto produto) {
        return repository.save(produto);
    }
}
