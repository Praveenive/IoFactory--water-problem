function computeWater() {
  const blockHeightsInput = document.getElementById('blockHeights').value;
  const blockHeights = blockHeightsInput.split(',').map(Number);

  const chart = document.getElementById('chart');
  const waterAmountElement = document.getElementById('waterAmount');

  const blockWidth = 40;
  const blockMargin = 10;
  const chartHeight = 200;
  const waterBlocks = calculateWaterBlocks(blockHeights);

  chart.innerHTML = '';
  let waterStored = 0;

  waterBlocks.forEach((height, index) => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', index * (blockWidth + blockMargin));
    rect.setAttribute('y', chartHeight - height * 20);
    rect.setAttribute('width', blockWidth);
    rect.setAttribute('height', height * 20);
    rect.style.fill = 'blue'; // Set the color of the water blocks
    chart.appendChild(rect);

    waterStored += height;
  });

  waterAmountElement.textContent = `Water Stored: ${waterStored} units`;
}

function calculateWaterBlocks(blockHeights) {
  const leftMax = [];
  const rightMax = [];
  let maxLeft = 0;
  let maxRight = 0;

  for (let i = 0; i < blockHeights.length; i++) {
    maxLeft = Math.max(maxLeft, blockHeights[i]);
    leftMax[i] = maxLeft;
  }

  for (let i = blockHeights.length - 1; i >= 0; i--) {
    maxRight = Math.max(maxRight, blockHeights[i]);
    rightMax[i] = maxRight;
  }

  const waterBlocks = [];
  for (let i = 0; i < blockHeights.length; i++) {
    const minHeight = Math.min(leftMax[i], rightMax[i]);
    waterBlocks.push(Math.max(0, minHeight - blockHeights[i]));
  }

  return waterBlocks;
}

computeWater();