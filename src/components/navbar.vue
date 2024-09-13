<template>
    <div class="navcontainer">
        <!-- Navbar -->
        <div class="navbar">
            <div class="logo">
                <img src="../assets/logo.png" alt="Logo" />
            </div>
            <div class="links">
                <a href="#Social">Social</a>
                <a href="#Blog">Blog</a>
                <a href="#Games">Games</a>
            </div>
            <div>
                <button>Home</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NavBar'
}
</script>

<style scoped>
.navcontainer {
  position: relative;
  border-radius: 15px;
  margin: 1em;
}

.navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 124px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px 15px 0 0;
    box-sizing: border-box;
    z-index: 10;
}

.navbar .logo {
    height: 124px;
}

.navbar .logo img {
    margin: 0px;
    width: 124px;
    height: 124px;
    border-radius: 15px 0 0 0;
}

.navbar .links {
    flex-grow: 1;
    text-align: right;
    margin: 15px;
}

.navbar .links a {
    margin-left: 10px;
    color: black;
    text-decoration: none;
}

.navbar .links a:hover {
    text-decoration: underline;
}

.navbar button {
    margin-right: 10px;
    padding: 10px 20px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>