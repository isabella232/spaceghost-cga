// hud.js - user interface stuff
import Phaser from 'phaser';
import Globals from '../../globals';

class HUD {

  constructor(scene, config) {
    this.scene = scene;
    this.config = config;

    this.shieldsBar = this.scene.add.graphics();
    this.energyBar = this.scene.add.graphics();
    this.timerBar = this.scene.add.graphics();

    scene.events.on('hud-ship-stats', (props) => this.repaint(props));

    this.repaint(config.player.props);
  }

  repaint(props) {
    const { timerBar, energyBar, shieldsBar } = this;

    const maxWidth = 500;
    const height = 20;
    const x = Globals.game.config.width * 0.5 - maxWidth * 0.5;
    let y = 0;

    if (props.shields) {
      shieldsBar.clear();
      shieldsBar.fillStyle(0xffffff, 1);
      shieldsBar.fillRect(x, y , 
        maxWidth * (props.shields / 100), height);
    }

    if (this.config.showEnergy) {
      y += height + 4;
      energyBar.clear();
      energyBar.fillStyle(0xffffff, 1);
      energyBar.fillRect(x, y,
        maxWidth * (props.energy / 100), height);
    }

    if (props.timer) {
      y += height + 4;
      timerBar.clear();
      timerBar.fillStyle(0xffffff, 1);
      timerBar.fillRect(x, y,
        maxWidth * (props.timer / 100), height);
    } else if (props.noTimer) {
      timerBar.clear();
    }
  }


}

export { HUD };
