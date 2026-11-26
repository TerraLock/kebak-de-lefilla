# Kebak de Lefilla

A NeoForge 1.21.1 modpack built around Create Aeronautics: airships, submarines, cars and cannons, in a
deep custom world (bedrock at y −192), with a lot of cooking, building and exploration mods on top.

This repository is the pack itself, in [packwiz](https://packwiz.infra.link/) format. The game installs and
updates it for you; you never need to download anything from here by hand.

## How to play

1. Install **[Prism Launcher](https://prismlauncher.org/)** and log in with your Microsoft account
   (Prism's *Accounts* button, top right).
2. Get the file **`Kebak de Lefilla.zip`** from TerraLock.
3. In Prism: **Add Instance → Import → Browse**, pick the zip, then **OK**.
4. Select **Kebak de Lefilla** and press **Launch**.

The first launch downloads the whole pack (about 750 MB), so it takes a few minutes. After that, every
launch quickly checks for updates and installs only what changed, then starts the game.

### Memory

The instance is set to **6 GB**. Your PC should have at least 8 GB of RAM. To change it:
*Edit → Settings → Java → Maximum memory allocation.* Don't go above about half of your PC's RAM.

### If something goes wrong

- **The update window shows an error:** check your internet connection and launch again. Your saves and
  settings are safe.
- **The game crashes:** send TerraLock the crash screen or the newest file in the instance's
  `minecraft/crash-reports` folder (*Edit → Folder* in Prism).
- Your own settings (video options, keybinds, minimap layout, voice chat) are never overwritten by updates.

## For the maintainer

Patches are published from the Prism instance with
`~/aero-test-server/tools/pack/publish.sh "what changed"`.
