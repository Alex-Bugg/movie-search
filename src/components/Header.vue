<template>
  <header>
    <nav class="blue-grey darken-4">
      <div class="container">
        <div class="nav-wrapper ">
          <a href="/" class="brand-logo" style="display:flex;">
            film<svg class="logo_svg">
              <use xlink:href="@/assets/logo.svg#Layer_1"></use>
            </svg>
            teka
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <router-link tag="li" active-class="active" to="/" :exact="true"
              ><a href="/">Главная</a></router-link
            >
            <router-link tag="li" active-class="active" to="/profile"
              ><a href="/profile">Моя фильмотека</a></router-link
            >
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {};
</script>

<style lang="scss" scope>
header {
  margin-bottom: 50px;
}

.brand-logo {
  display: flex;
  align-items: center;
  &:hover,
  &:hover .logo_svg {
    color: #ccc;
    fill: #ccc;
  }

  &:active,
  &:active .logo_svg {
    opacity: 0.7;
  }
}

.logo_svg {
  width: 30px;
  height: 30px;
  fill: #fff;
}

.hide-on-med-and-down a {
  &:hover {
    background-color: #37474f;
  }
}
</style>
