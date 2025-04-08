class LlSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const min = parseInt(this.getAttribute('rangemin')) || 1;
    const max = parseInt(this.getAttribute('rangemax')) || 4;
    const start = parseInt(this.getAttribute('start')) || min;
    const end = parseInt(this.getAttribute('end')) || max;

    this.shadowRoot.innerHTML = `
      <style>
        .slider-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input[type=range] {
          width: 100%;
          margin: 5px 0;
        }
        .labels {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 12px;
          color: #666;
        }
      </style>
      <div class="slider-container">
        <input type="range" min="${min}" max="${max}" value="${start}" id="startRange">
        <input type="range" min="${min}" max="${max}" value="${end}" id="endRange">
        <div class="labels">
          <span>Low</span><span>Mid</span><span>High</span><span>Extreme</span>
        </div>
      </div>
    `;

    this.startInput = this.shadowRoot.getElementById('startRange');
    this.endInput = this.shadowRoot.getElementById('endRange');

    const updateAttributes = () => {
      let s = parseInt(this.startInput.value);
      let e = parseInt(this.endInput.value);
      if (s > e) [s, e] = [e, s]; // Swap if out of order
      this.setAttribute('start', s);
      this.setAttribute('end', e);
    };

    this.startInput.addEventListener('input', updateAttributes);
    this.endInput.addEventListener('input', updateAttributes);
  }
}

customElements.define('ll-slider', LlSlider);
