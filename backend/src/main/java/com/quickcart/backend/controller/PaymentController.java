package com.quickcart.backend.controller;

import com.quickcart.backend.dto.PaymentRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin
public class PaymentController {

    // 🔴 TEST MODE KEYS (dashboard se)
    private static final String KEY = "rzp_test_S9dHIPf99DKpjM";
    private static final String SECRET = "4JWDatS1uliAlRXaKbBGUQT4";

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody PaymentRequest request) {

        Map<String, Object> response = new HashMap<>();

        try {
            RazorpayClient client = new RazorpayClient(KEY, SECRET);

            JSONObject options = new JSONObject();
            options.put("amount", request.getAmount() * 100); // ✅ paise
            options.put("currency", "INR");
            options.put("receipt", "rcpt_" + System.currentTimeMillis());

            Order order = client.orders.create(options);

            response.put("success", true);
            response.put("orderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));

            return response;

        } catch (RazorpayException e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("error", e.getMessage());
            return response;
        }
    }
}
