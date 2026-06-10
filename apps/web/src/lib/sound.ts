/**
 * SoundManager: API delgada sobre WebAudio.
 * Diseñado para activarse tras la primera interacción del usuario
 * (los navegadores bloquean audio sin gesto del usuario).
 * Los efectos se generan proceduralmente para no requerir assets externos.
 */

type Tone = { freq: number; duration: number; type?: OscillatorType; volume?: number };

class SoundManager {
  private ctx: AudioContext | null = null;
  private muted = false;
  private musicGain: GainNode | null = null;
  private musicInterval: number | null = null;

  init() {
    if (this.ctx) return;
    const AudioCtor: typeof AudioContext | undefined =
      (
        window as unknown as {
          AudioContext?: typeof AudioContext;
          webkitAudioContext?: typeof AudioContext;
        }
      ).AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    this.ctx = new AudioCtor();
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.musicGain) this.musicGain.gain.value = m ? 0 : 0.05;
  }

  isMuted() {
    return this.muted;
  }

  private playTone(t: Tone) {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = t.type ?? 'sine';
    osc.frequency.setValueAtTime(t.freq, ctx.currentTime);
    gain.gain.setValueAtTime(t.volume ?? 0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t.duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + t.duration);
  }

  click() {
    this.playTone({ freq: 740, duration: 0.05, type: 'square', volume: 0.05 });
  }

  reward() {
    this.playTone({ freq: 523.25, duration: 0.1, type: 'triangle', volume: 0.08 });
    setTimeout(
      () => this.playTone({ freq: 659.25, duration: 0.1, type: 'triangle', volume: 0.08 }),
      90,
    );
    setTimeout(
      () => this.playTone({ freq: 783.99, duration: 0.18, type: 'triangle', volume: 0.08 }),
      180,
    );
  }

  danger() {
    this.playTone({ freq: 180, duration: 0.2, type: 'sawtooth', volume: 0.07 });
    setTimeout(
      () => this.playTone({ freq: 120, duration: 0.3, type: 'sawtooth', volume: 0.07 }),
      90,
    );
  }

  levelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) =>
      setTimeout(
        () => this.playTone({ freq: f, duration: 0.12, type: 'triangle', volume: 0.08 }),
        i * 80,
      ),
    );
  }

  startMusic() {
    if (!this.ctx || this.musicInterval !== null) return;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = this.muted ? 0 : 0.04;
    this.musicGain.connect(this.ctx.destination);
    const notes = [196, 246.94, 293.66, 392, 329.63];
    let i = 0;
    this.musicInterval = window.setInterval(() => {
      const f = notes[i % notes.length]!;
      this.playTone({ freq: f, duration: 0.45, type: 'sine', volume: 0.04 });
      i++;
    }, 900);
  }

  stopMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundManager();
