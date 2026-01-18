//package com.shivani.notice_zone_backend.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.*;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.servlet.config.annotation.*;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .cors()  // ✅ Enable CORS
//                .and()
//                .csrf().disable()  // ✅ Disable CSRF for simplicity in development
//                .authorizeRequests()
//                .antMatchers("/api/auth/**").permitAll()  // Allow auth endpoints
//                .antMatchers("/api/notices/add").hasRole("PROFESSOR")
//                .antMatchers("/api/notices").hasAnyRole("ADMIN", "PROFESSOR", "HOD")
//                .antMatchers("/api/notices/**").hasRole("ADMIN")
//                .anyRequest().authenticated()
//                .and()
//                .formLogin().permitAll()
//                .and()
//                .logout().permitAll();
//    }
//
//    // ✅ This handles the actual CORS configuration
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:5173")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }
//}
