using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 5f;

    private Rigidbody2D rb;
    private Vector2 input;
    private Animator animator;

    private int direction = 0;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
    }

    void Update()
    {
        input = Vector2.zero;

        if (Keyboard.current != null)
        {
            if (Keyboard.current.wKey.isPressed)
                input.y += 1;

            if (Keyboard.current.sKey.isPressed)
                input.y -= 1;

            if (Keyboard.current.aKey.isPressed)
                input.x -= 1;

            if (Keyboard.current.dKey.isPressed)
                input.x += 1;
        }

        input = input.normalized;

        // Saber si el jugador se está moviendo
        animator.SetBool("IsMoving", input != Vector2.zero);

        // Saber la dirección
        if (input.y > 0)
            direction = 1; // Espaldas
        else if (input.y < 0)
            direction = 0; // Frente
        else if (input.x < 0)
            direction = 2; // Izquierda
        else if (input.x > 0)
            direction = 3; // Derecha

        animator.SetInteger("Direction", direction);
    }

    void FixedUpdate()
    {
        rb.MovePosition(
            rb.position + input * speed * Time.fixedDeltaTime
        );
    }
}