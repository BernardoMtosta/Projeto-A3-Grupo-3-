package com.utrip.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repo;

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return repo.save(usuario);
    }

    @GetMapping
    public List<Usuario> listar() {
        return repo.findAll();
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return repo.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repo.deleteById(id);
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Usuario loginData) {
    System.out.println("Tentando login: " + loginData.getEmail() + " / " + loginData.getSenha());
    Usuario usuario = repo.findByEmail(loginData.getEmail());
    System.out.println("Encontrado: " + (usuario != null ? usuario.getEmail() + " / " + usuario.getSenha() : "null"));
    if (usuario != null && usuario.getSenha().equals(loginData.getSenha())) {
        return ResponseEntity.ok(usuario);
    } else {
        return ResponseEntity.status(401).body("Email ou senha inválidos");
    }
}
}