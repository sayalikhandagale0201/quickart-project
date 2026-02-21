package com.quickcart.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)

    private String name;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // 👈 ADMIN / USER

}
