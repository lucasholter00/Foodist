<template>
    <div class="container">
        <h1 style="color:mediumseagreen">Food Color Info</h1>
        <h3 style="color:red">Red color border: </h3>
        <p>Food items that are expired.</p>
        <br>
        <h3 style="color:rgb(233, 206, 53)">Yellow color border: </h3>
        <p>Food items that will be expired with in 15 days.<br> OBS: Home page will display only those which expire within 5 days.</p>
        <br>
        <h3 style="color:green">Green color border: </h3>
        <p>Food items that has more than 15 days to expire.</p>
    </div>
</template>

<style scoped>

.container {
  max-width: 1000px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid #80b095 !important;
  padding: 30px;
  border-radius: 5px;
}

h1 {
    border-bottom:1px solid #80b095;
    padding: 20px;
}
</style>
