#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct ServerInfo {
    online_players: u32,
    server_time: String,
    status: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct GameSettings {
    allocated_ram: u32,
    java_path: String,
    resolution_width: u32,
    resolution_height: u32,
    fullscreen: bool,
    render_distance: u32,
    master_volume: f32,
}

impl Default for GameSettings {
    fn default() -> Self {
        Self {
            allocated_ram: 4096,
            java_path: "/usr/bin/java".to_string(),
            resolution_width: 1920,
            resolution_height: 1080,
            fullscreen: false,
            render_distance: 12,
            master_volume: 0.8,
        }
    }
}

struct AppState {
    server_info: Mutex<Option<ServerInfo>>,
    game_settings: Mutex<GameSettings>,
}

#[tauri::command]
async fn get_server_info(state: State<'_, AppState>) -> Result<ServerInfo, String> {
    // Simulation de la récupération des infos serveur
    let server_info = ServerInfo {
        online_players: 127,
        server_time: chrono::Utc::now().format("%H:%M:%S").to_string(),
        status: "online".to_string(),
    };

    // Mise à jour de l'état
    let mut state_info = state.server_info.lock().unwrap();
    *state_info = Some(server_info.clone());

    Ok(server_info)
}

#[tauri::command]
async fn download_client(window: tauri::Window) -> Result<(), String> {
    // Simulation du téléchargement avec progression
    for i in 0..=100 {
        tokio::time::sleep(tokio::time::Duration::from_millis(50)).await;
        
        window
            .emit("download_progress", i)
            .map_err(|e| e.to_string())?;
    }

    window
        .emit("download_complete", true)
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn install_client() -> Result<(), String> {
    // Simulation de l'installation
    tokio::time::sleep(tokio::time::Duration::from_millis(1000)).await;
    println!("Client installé avec succès");
    Ok(())
}

#[tauri::command]
async fn launch_game(settings: GameSettings) -> Result<(), String> {
    println!("Lancement du jeu avec les paramètres: {:?}", settings);
    
    // Ici, on lancerait réellement Minecraft avec les paramètres
    // Exemple de commande Java:
    let _java_command = format!(
        "{} -Xmx{}M -jar minecraft.jar --width {} --height {}",
        settings.java_path,
        settings.allocated_ram,
        settings.resolution_width,
        settings.resolution_height
    );

    Ok(())
}

#[tauri::command]
async fn uninstall_client() -> Result<(), String> {
    // Simulation de la désinstallation
    println!("Désinstallation du client...");
    tokio::time::sleep(tokio::time::Duration::from_millis(500)).await;
    Ok(())
}

#[tauri::command]
async fn save_settings(settings: GameSettings, state: State<'_, AppState>) -> Result<(), String> {
    println!("Sauvegarde des paramètres: {:?}", settings);
    
    // Mise à jour de l'état
    let mut state_settings = state.game_settings.lock().unwrap();
    *state_settings = settings;

    // Ici, on sauvegarderait dans un fichier de configuration
    Ok(())
}

#[tauri::command]
async fn load_settings(state: State<'_, AppState>) -> Result<GameSettings, String> {
    let state_settings = state.game_settings.lock().unwrap();
    Ok(state_settings.clone())
}

#[tauri::command]
async fn check_java_installation() -> Result<String, String> {
    // Vérification de l'installation Java
    match std::process::Command::new("java").arg("-version").output() {
        Ok(output) => {
            let version = String::from_utf8_lossy(&output.stderr);
            Ok(version.to_string())
        }
        Err(_) => Err("Java non trouvé sur le système".to_string()),
    }
}

#[tauri::command]
async fn get_system_info() -> Result<serde_json::Value, String> {
    // Récupération des informations système
    let total_memory = sys_info::mem_info()
        .map(|info| info.total)
        .unwrap_or(0);

    let cpu_num = sys_info::cpu_num().unwrap_or(0);

    Ok(serde_json::json!({
        "total_memory_mb": total_memory / 1024,
        "cpu_cores": cpu_num,
        "os": std::env::consts::OS
    }))
}

fn main() {
    tauri::Builder::default()
        .manage(AppState {
            server_info: Mutex::new(None),
            game_settings: Mutex::new(GameSettings::default()),
        })
        .invoke_handler(tauri::generate_handler![
            get_server_info,
            download_client,
            install_client,
            launch_game,
            uninstall_client,
            save_settings,
            load_settings,
            check_java_installation,
            get_system_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}