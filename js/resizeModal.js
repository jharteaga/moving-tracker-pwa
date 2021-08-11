class ResizeModal {
  constructor(breakPoint, modalName) {
    (this.breakPoint = breakPoint), (this.modalName = modalName);
  }

  onLoad() {
    if (screen.width >= this.breakPoint) {
      this.modalName.classList.add('modal_large');
    } else {
      this.modalName.classList.remove('modal_large');
    }
  }
  onScreenSizeChange() {
    const mediaQuery = window.matchMedia(`(min-width: ${this.breakPoint}px)`);

    mediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        this.modalName.classList.add('modal_large');
      } else {
        this.modalName.classList.remove('modal_large');
      }
    });
  }
}
