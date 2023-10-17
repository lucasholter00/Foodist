<template>
    <div class="box">
        <h1 id="info">Food Card Color Info</h1>
        <h3 style="color:red">Red color border: </h3>
        <p>Food items that are expired will appear with red border on both sides.</p>
        <br>
        <h3 style="color:rgb(233, 206, 53)">Yellow color border: </h3>
        <p>Food items that will be expired with in 15 days will appear with yellow border on both sides.<br> OBS: Home page will display only those which expire within 5 days.</p>
        <br>
        <h3 style="color:green">Green color border: </h3>
        <p>Food items that has more than 15 days to expire will appear with green border on both sides.</p>
    </div>
</template>

<style scoped>
#info{
    border-bottom:1px solid #80b095;
    padding: 20px;
    color: mediumseagreen !important;
}

</style>
