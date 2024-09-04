import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  audio: any;
  playlist: Array<{ title: string; path: string}> = [
    { title: 'Enter Sandman', path: 'ActMusica\src\assets\music\Enter Sandman Remastered.mp3' },
    { title: 'Beat it', path: 'ActMusica\src\assets\music\Beat it.mp3'},
    //{ title: 'Canción 3', path: 'assets/audio/cancion3.mp3'},
  ];
  cancionActual: number = 0;

  constructor() {
    this.cargarCancion(this.cancionActual); //cargar primera cancion
  }

  cargarCancion(index: number) {
    if (this.audio) {
      this.audio.pause(); //pausar cualquier audio que se esté reproduciendo
    }
    this.audio = new Audio(this.playlist[index].path);
  }

  playAudio() {
    this.audio.play();
    //this.cd= 'assets/img/cd.gif';
  }

  pauseAudio() {
    this.audio.pause();
    //this.cd= 'assets/img/cd.gif';
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0; //reiniciar audio
  }

  nextTrack() {
    this.cancionActual++;
    if (this.cancionActual >= this.playlist.length) {
      this.cancionActual = 0;//reiniciar lista de canciones
    }
    this.cargarCancion(this.cancionActual);
    this.playAudio();//reproducir automaticamente la sgte cancion
  }

  previousTrack() {
    this.cancionActual--;
    if (this.cancionActual < 0) {
      this.cancionActual = this.playlist.length - 1; //ir a la ultima cancion si es la primera
    }
    this.cargarCancion(this.cancionActual);
    this.playAudio();//reproducir automaticamente la cancion anterior
  }
  
}
