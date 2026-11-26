// Aero pack: Glaiden's Audio (radio mod) needs two runtime libraries that it normally only
// downloads when a player clicks the "((" button on the title screen:
//   - the lavaplayer audio decoder (the right file for the player's OS)
//   - YouTube playback support
// This script installs them automatically in the background on first launch, using the mod's
// own installer (same download, same checksum check), then removes the button from the title
// screen. The library screen is still reachable from Options > Music & Sounds.

const NativeAudioLibs = Java.loadClass('radiocraft.client.audio.NativeAudioLibs')
const YoutubeAudioLibs = Java.loadClass('radiocraft.client.audio.YoutubeAudioLibs')
// Progress is reported from the download thread, so it gets a plain Java consumer, not a script function.
const SilentProgress = Java.loadClass('java.util.DoubleSummaryStatistics')

function aeroInstallGlaiden(name, lib) {
  try {
    if (lib.isInstalled() || lib.isInstalling()) return
    console.info(`[aero] Glaiden's Audio: installing ${name} library`)
    lib.install(new SilentProgress(),
      () => console.info(`[aero] Glaiden's Audio: ${name} library installed`),
      err => console.warn(`[aero] Glaiden's Audio: ${name} library install failed: ${err}`))
  } catch (e) {
    console.warn(`[aero] Glaiden's Audio: ${name} auto-install error: ${e}`)
  }
}

if (NativeAudioLibs.isSupportedPlatform()) aeroInstallGlaiden('audio decoder', NativeAudioLibs)
aeroInstallGlaiden('YouTube', YoutubeAudioLibs)

// Remove the library button from the title screen (runs after Glaiden adds it).
// Wrapped in try/catch: an error inside a game event would crash the game.
const EventPriority = Java.loadClass('net.neoforged.bus.api.EventPriority')
const ScreenInitPost = Java.loadClass('net.neoforged.neoforge.client.event.ScreenEvent$Init$Post')
const TitleScreen = Java.loadClass('net.minecraft.client.gui.screens.TitleScreen')
const LibIconButton = Java.loadClass('radiocraft.client.screen.LibIconButton')
NativeEvents.onEvent(EventPriority.LOWEST, ScreenInitPost, event => {
  try {
    if (!(event.getScreen() instanceof TitleScreen)) return
    // (var, not const/let: KubeJS's script engine rejects re-declaring those on every call)
    var widgets = event.getListenersList().toArray()
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i] instanceof LibIconButton) event.removeListener(widgets[i])
    }
  } catch (e) {
    console.warn(`[aero] could not hide Glaiden's title button: ${e}`)
  }
})
