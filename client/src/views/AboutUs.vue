<template>
  <div>
  <div class="about-section">
      <h1>About Us</h1>
      <p>Some text about who we are and what we do.</p>
    </div>

    <h2 style="text-align:center">Our Team</h2>
    <div class="box">
    <div class="row">
    <div class="column">
    <div class="card">
    <img src="../assets/pic1.jpeg" alt="Faiza">
    <div class="container">
      <h2>Faiza Amjad</h2>
      <p class="title">Developer</p>
      <p>Student of Gothenburg University. Studying Software Engineering and Management (Bachelor Program).</p>
      <p>gusamjfa@student.gu.se</p>
    </div>
    </div>
    </div>

    <div class="column">
    <div class="card">
    <img src="/images/pic2.jpg" alt="Lucas">
    <div class="container">
      <h2>Lucas Carlsson Holter</h2>
      <p class="title">Developer</p>
      <p>Student of Gothenburg University. Studying Software Engineering and Management (Bachelor Program).</p>
      <p>guscarlslu@student.gu.se</p>
    </div>
    </div>
    </div>

    <div class="column">
    <div class="card">
    <img src="/images/pic3.jpg" alt="Cornelia">
    <div class="container">
      <h2>Cornelia Olofsson Larsson</h2>
      <p class="title">Developer</p>
      <p>Student of Gothenburg University. Studying Software Engineering and Management (Bachelor Program).</p>
      <p>Guscornol@student.gu.se</p>
    </div>
    </div>
    </div>
    </div>
  </div>
  </div>
</template>

<style>

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 20px 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: mediumseagreen;
  color: white;
}

.box {
  max-width: 1000px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid #80b095 !important;
  padding: 30px;
  border-radius: 5px;
}

.container {
  padding: 0 16px;
}

.title {
  color: grey;
}

img {
  width:100%;
  padding: 70px;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>
