<template>
  <div class="login">
    <div class="login-content">
        <h1>Войти</h1>
        <form @submit.prevent = submit>
          <div class="login__input">
            <span>Имя пользователя</span>
            <input type="text" name="login" v-model="name" pattern="[a-zA-Z]+" maxlength="16"/>
            <button type="submit" class="login__btn">
              Войти
            </button>
          </div>
        </form>
        <p class="login-error" v-if="errorLogin">
          Неверное имя пользователя
        </p>
        <div class="login-loader" v-if="loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      name: '',
      errorLogin: false,
      loading: false,
    }
  },
  methods: {
    submit() {
      this.loading = true
      this.$store.dispatch('changeAuth', this.name)

      setTimeout(() => {
        this.auth()
      }, 3000)

    },

    auth() {
      if(this.$store.getters.getAuth) {
        this.$router.push('/books')
      } else {
        this.errorLogin = true
        this.loading = false
      }
    }
  },
}
</script>


<style lang="scss">
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background: radial-gradient(41.2% 70.34% at 0% 34.2%, #c4effd 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(36.07% 65.69% at 100% 0%, #a4e8ff 0%, rgba(255, 255, 255, 0.42) 100%);

  &-content {
    width: 300px;
    position: relative;
  }

  	&__title {
		margin-bottom: 1.6rem;
		font-size: 1.2rem;
		font-weight: 600;
	}

	&__input {
		margin-bottom: 1.2rem;

		span {
			display: block;
			margin-bottom: 4px;
      text-align: left;
      font-size: 14px;
		}

		input {
			width: 100%;
			background: #FAFAFA;
			border: 1px solid #F1F1F1;
			border-radius: 8px;
			padding: 16px 24px;
			color: #898e96;
			outline: none;
		}
	}

	&__btn {
		width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    background: #0967c5;
    border: 1px solid #0967c5;
    color: #fff;
    font-size: 18px;
    border-radius: 8px;
    margin-top: 20px;
    cursor: pointer;
	}

  &-error {
    color: red;
    font-size: 14px;
  }

  &-loader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, .8);
  }


  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #0967c5;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #0967c5 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

}
</style>