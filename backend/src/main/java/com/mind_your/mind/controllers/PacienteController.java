package com.mind_your.mind.controllers;

import com.mind_your.mind.models.Paciente;
import com.mind_your.mind.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
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


@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public PacienteController(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    // Cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<Paciente> cadastrar(@RequestBody Paciente paciente) {
        // Se o login não for fornecido, usa o email como login
        if (paciente.getLogin() == null || paciente.getLogin().isEmpty()) {
            paciente.setLogin(paciente.getEmail());
        }
        // Criptografar a senha antes de salvar
        paciente.setSenha(passwordEncoder.encode(paciente.getSenha()));
        Paciente novo = pacienteRepository.save(paciente);
        return ResponseEntity.ok(novo);
    }

    // Listar todos
    @GetMapping
    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    // Buscar por email
    @GetMapping("/email/{email}")
    public ResponseEntity<Paciente> buscarPorEmail(@PathVariable String email) {
        Optional<Paciente> paciente = pacienteRepository.findByEmail(email);
        return paciente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por nome
    @GetMapping("/nome/{nome}")
    public ResponseEntity<Paciente> buscarPorNome(@PathVariable String nome) {
        Optional<Paciente> paciente = pacienteRepository.findByNome(nome);
        return paciente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por login (email ou username)
    @GetMapping("/login/{login}")
    public ResponseEntity<Paciente> buscarPorLogin(@PathVariable String login) {
        // Se for e-mail válido
        if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return pacienteRepository.findByEmail(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } else {
            return pacienteRepository.findByLogin(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    }

    // Atualizar
@PutMapping("/{id}")
public ResponseEntity<Paciente> atualizar(@PathVariable String id, @RequestBody Paciente camposAtualizados) {
    return pacienteRepository.findById(id)
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

                Paciente atualizado = pacienteRepository.save(p);
                return ResponseEntity.ok(atualizado);
            }).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable String id) {
        return pacienteRepository.findById(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Deletar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Paciente> login(@RequestBody Map<String, String> dados) {
    String login = dados.get("login");
    String senha = dados.get("senha");

    Optional<Paciente> pacienteOpt;

    if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
        pacienteOpt = pacienteRepository.findByEmail(login);
    } else {
        pacienteOpt = pacienteRepository.findByLogin(login);
    }

    if (pacienteOpt.isEmpty()) {
        return ResponseEntity.status(400).build();
    }

    Paciente paciente = pacienteOpt.get();

    if (!passwordEncoder.matches(senha, paciente.getSenha())) {
        return ResponseEntity.status(400).build();
    }

    return ResponseEntity.ok(paciente);
}

}
