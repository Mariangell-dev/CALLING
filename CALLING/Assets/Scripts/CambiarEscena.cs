using System;
using UnityEngine;
using UnityEngine.SceneManagement;

public class CambiarEscena : MonoBehaviour
{
    public void Play()
    {
        Debug.Log("Hello word");
        SceneManager.LoadScene("Game");
        
    }
}
