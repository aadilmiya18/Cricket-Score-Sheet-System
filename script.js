let editingIndex = null;

function setTeams() {
  let team1 = document.getElementById("team1").value;
  let team2 = document.getElementById("team2").value;
  document.getElementById("teamsDisplay").textContent = `${team1} vs ${team2}`;
}

function showModal(button) {
  editingIndex = button ? button.closest("tr") : null;
  document.getElementById("playerModal").style.display = "flex";

  if (editingIndex) {
    let cells = editingIndex.getElementsByTagName("td");
    document.getElementById("batsman").value = cells[1].textContent;
    document.getElementById("howOut").value = cells[2].textContent;
    document.getElementById("bowler").value = cells[3].textContent;
    document.getElementById("ones").value = cells[4].textContent;
    document.getElementById("twos").value = cells[5].textContent;
    document.getElementById("threes").value = cells[6].textContent;
    document.getElementById("fours").value = cells[7].textContent;
    document.getElementById("sixes").value = cells[8].textContent;
    document.getElementById("runs").value = cells[9].textContent;
  }
}

function hideModal() {
  document.getElementById("playerModal").style.display = "none";
  document
    .querySelectorAll(".modal-content input")
    .forEach((input) => (input.value = ""));
  editingIndex = null;
}

function calculateTotal() {
  let ones = parseInt(document.getElementById("ones").value) || 0;
  let twos = parseInt(document.getElementById("twos").value) || 0;
  let threes = parseInt(document.getElementById("threes").value) || 0;
  let fours = parseInt(document.getElementById("fours").value) || 0;
  let sixes = parseInt(document.getElementById("sixes").value) || 0;

  let total = ones * 1 + twos * 2 + threes * 3 + fours * 4 + sixes * 6;
  document.getElementById("runs").value = total;
}

function addOrUpdatePlayer() {
  let batsman = document.getElementById("batsman").value;
  let howOut = document.getElementById("howOut").value;
  let bowler = document.getElementById("bowler").value;
  let ones = document.getElementById("ones").value;
  let twos = document.getElementById("twos").value;
  let threes = document.getElementById("threes").value;
  let fours = document.getElementById("fours").value;
  let sixes = document.getElementById("sixes").value;
  let runs = document.getElementById("runs").value;

  let playerData = {
    batsman,
    howOut,
    bowler,
    ones,
    twos,
    threes,
    fours,
    sixes,
    runs,
  };

  if (editingIndex === null) {
    addPlayerRow(playerData);
  } else {
    let row = editingIndex;
    row.cells[1].textContent = batsman;
    row.cells[2].textContent = howOut;
    row.cells[3].textContent = bowler;
    row.cells[4].textContent = ones;
    row.cells[5].textContent = twos;
    row.cells[6].textContent = threes;
    row.cells[7].textContent = fours;
    row.cells[8].textContent = sixes;
    row.cells[9].textContent = runs;
  }

  hideModal();
  updateSerialNumbers();
}

function addPlayerRow(playerData) {
  let table = document.getElementById("scoreTable");
  let row = table.insertRow();
  row.innerHTML = `<td></td>
          <td>${playerData.batsman}</td><td>${playerData.howOut}</td><td>${playerData.bowler}</td>
          <td>${playerData.ones}</td><td>${playerData.twos}</td><td>${playerData.threes}</td>
          <td>${playerData.fours}</td><td>${playerData.sixes}</td><td>${playerData.runs}</td>
          <td>
              <button onclick="showModal(this)" class="btn">Edit</button>
              <button onclick="deletePlayer(this)" class="btn">Delete</button>
          </td>`;
}

function deletePlayer(button) {
  let row = button.closest("tr");
  row.remove();
  updateSerialNumbers();
}

let editingBowlerIndex = null;

function showBowlerModal(button) {
  editingBowlerIndex = button ? button.closest("tr") : null;
  document.getElementById("bowlerModal").style.display = "flex";

  if (editingBowlerIndex) {
    let cells = editingBowlerIndex.getElementsByTagName("td");
    document.getElementById("bowlerName").value = cells[1].textContent;
    document.getElementById("overs").value = cells[2].textContent;
    document.getElementById("runsConceded").value = cells[3].textContent;
  }
}

function hideBowlerModal() {
  document.getElementById("bowlerModal").style.display = "none";
  document
    .querySelectorAll(".modal-content input")
    .forEach((input) => (input.value = ""));
  editingBowlerIndex = null;
}

function addOrUpdateBowler() {
  let bowlerName = document.getElementById("bowlerName").value;
  let overs = document.getElementById("overs").value;
  let wicketsTaken = document.getElementById("wicketsTaken").value;
  let runsConceded = document.getElementById("runsConceded").value;
  let economy = (runsConceded / overs).toFixed(2);

  let table = document.getElementById("bowlerTable");

  if (!editingBowlerIndex) {
    let row = table.insertRow();
    row.innerHTML = `<td></td>
                       <td>${bowlerName}</td>
                       <td>${overs}</td>
                       <td>${wicketsTaken}</td>
                       <td>${runsConceded}</td>
                       <td>${economy}</td>
                       <td>
                         <button onclick="showBowlerModal(this)" class="btn">Edit</button>
                         <button onclick="deleteBowler(this)" class="btn">Delete</button>
                       </td>`;
  } else {
    let cells = editingBowlerIndex.getElementsByTagName("td");
    cells[1].textContent = bowlerName;
    cells[2].textContent = overs;
    cells[3].textContent = wicketsTaken;
    cells[4].textContent = runsConceded;
    cells[5].textContent = economy;
  }

  hideBowlerModal();
  updateBowlerSerialNumbers();
}

function deleteBowler(button) {
  let row = button.closest("tr");
  row.remove();
  updateBowlerSerialNumbers();
}

function updateSerialNumbers() {
  let rows = document.querySelectorAll("#scoreTable tr");
  rows.forEach((row, index) => {
    row.cells[0].textContent = index + 1;
  });
}

function updateBowlerSerialNumbers() {
  let rows = document.querySelectorAll("#bowlerTable tr");
  rows.forEach((row, index) => {
     row.cells[0].textContent = index + 1;
  });
}

function showTable(type) {
  if (type === "batter") {
    document.getElementById("batterTable").style.display = "table";
    document.getElementById("bowlerTable").style.display = "none";
  } else {
    document.getElementById("batterTable").style.display = "none";
    document.getElementById("bowlerTable").style.display = "table";
  }
}
