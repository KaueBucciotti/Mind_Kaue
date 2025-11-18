package com.mind_your.mind.controllers;

import com.mind_your.mind.models.Psicologo;
import com.mind_your.mind.repository.PsicologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/psicologos")
public class PsicologoController {

    private final PsicologoRepository psicologoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public PsicologoController(PsicologoRepository psicologoRepository) {
        this.psicologoRepository = psicologoRepository;
    }

    // Cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<Psicologo> cadastrar(@RequestBody Psicologo psicologo) {
        // Criptografar a senha antes de salvar
        if (psicologo.getLogin() == null || psicologo.getLogin().isEmpty()) {
            psicologo.setLogin(psicologo.getEmail());
        }
        psicologo.setSenha(passwordEncoder.encode(psicologo.getSenha()));
        Psicologo novo = psicologoRepository.save(psicologo);
        return ResponseEntity.ok(novo);
    }

    // Listar todos
    @GetMapping
    public List<Psicologo> listarTodos() {
        return psicologoRepository.findAll();
    }

    // Buscar por email
    @GetMapping("/email/{email}")
    public ResponseEntity<Psicologo> buscarPorEmail(@PathVariable String email) {
        Optional<Psicologo> psicologo = psicologoRepository.findByEmail(email);
        return psicologo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por nome
    @GetMapping("/nome/{nome}")
    public ResponseEntity<Psicologo> buscarPorNome(@PathVariable String nome) {
        Optional<Psicologo> psicologo = psicologoRepository.findByNome(nome);
        return psicologo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por login (email ou username)
    @GetMapping("/login/{login}")
    public ResponseEntity<Psicologo> buscarPorLogin(@PathVariable String login) {
        if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return psicologoRepository.findByEmail(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } else {
            return psicologoRepository.findByLogin(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    }

    // Atualizar
    @PutMapping("/{id}")
    public ResponseEntity<Psicologo> atualizar(@PathVariable String id, @RequestBody Psicologo camposAtualizados) {
        return psicologoRepository.findById(id)
                .map(p -> {
                    if (camposAtualizados.getNome() != null) p.setNome(camposAtualizados.getNome());
                    if (camposAtualizados.getSobrenome() != null) p.setSobrenome(camposAtualizados.getSobrenome());
                    if (camposAtualizados.getLogin() != null) p.setLogin(camposAtualizados.getLogin()); // ✅ ADICIONAR ESTA LINHA
                    if (camposAtualizados.getEmail() != null) p.setEmail(camposAtualizados.getEmail());
                    if (camposAtualizados.getSenha() != null) p.setSenha(passwordEncoder.encode(camposAtualizados.getSenha()));
                    if (camposAtualizados.getDtNascimento() != null) p.setDtNascimento(camposAtualizados.getDtNascimento());
                    if (camposAtualizados.getGenero() != null) p.setGenero(camposAtualizados.getGenero());
                    if (camposAtualizados.getTelefone() != null) p.setTelefone(camposAtualizados.getTelefone());
                    if (camposAtualizados.getEndereco() != null) p.setEndereco(camposAtualizados.getEndereco());
                    if (camposAtualizados.getImgPerfil() != null) p.setImgPerfil(camposAtualizados.getImgPerfil());
                    if (camposAtualizados.getSobreMim() != null) p.setSobreMim(camposAtualizados.getSobreMim());
                    if (camposAtualizados.getMedicamentos() != null) p.setMedicamentos(camposAtualizados.getMedicamentos());
                    if (camposAtualizados.getPreferencias() != null) p.setPreferencias(camposAtualizados.getPreferencias());
                    if (camposAtualizados.getCrp() != null) p.setCrp(camposAtualizados.getCrp());

                    Psicologo atualizado = psicologoRepository.save(p);
                    return ResponseEntity.ok(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }
    
    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Psicologo> buscarPorId(@PathVariable String id) {
        return psicologoRepository.findById(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Deletar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        if (psicologoRepository.existsById(id)) {
            psicologoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Psicologo> login(@RequestBody Map<String, String> dados) {
        String login = dados.get("login");
        String senha = dados.get("senha");

        Optional<Psicologo> psicologoOpt;

        if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            psicologoOpt = psicologoRepository.findByEmail(login);
        } else {
            psicologoOpt = psicologoRepository.findByLogin(login);
        }

        if (psicologoOpt.isEmpty()) {
            return ResponseEntity.status(400).build();
        }

        Psicologo psicologo = psicologoOpt.get();

        // CORRIGIDO: Usa passwordEncoder para comparar senhas
        if (!passwordEncoder.matches(senha, psicologo.getSenha())) {
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.ok(psicologo);
    }
}