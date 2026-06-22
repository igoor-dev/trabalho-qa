package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;


public class UserServiceTest {
    
    @Test

    void testIsPasswordValid() {
        UserService userService = new UserService(null);
        assertTrue(userService.isPasswordValid("Igor123'"));
    }
    // # e ' é um caractere especial, mas não é considerado válido


}
