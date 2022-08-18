<template>
    <section class="books">
        <div class="books-search">
            <input type="text" placeholder="Поиск" v-model="search">
            <img src="../assets/img/search.svg" alt="ico">
            <span @click="logout">Выход</span>
        </div>
        <div class="books-table" v-if="books.length">
            <div class="books-item" v-for="(item,idx) in books" :key="idx">
                <div class="books-item__img">
                    <img :src="item.volumeInfo.imageLinks?.smallThumbnail" :alt="item.title">
                </div>
                <div class="books-item__wrap">
                    <div class="books-item__name">
                        {{item.volumeInfo.title}}
                    </div>
                    <div class="books-item__author">
                        {{parseAuthors(item.volumeInfo.authors)}}
                    </div>
                </div>
            </div>
        </div>
        <div class="books-none" v-else>
            Нет результатов
        </div>
    </section>
</template>

<script>
export default {
    name: 'booksPage',
    data() {
        return {
            search: '',
            waitingSearch: false,
            books: [],
        }
    },

    middleware: ['auth'],

    methods: {
        parseAuthors(author) {
            console.log(typeof(author))
            if(author && author.length > 0) {
                return author.join(',')
            } else {
                return author
            }
        },

        logout() {
            this.$store.dispatch('logOut')
            this.$router.push('/')
        }
    },

    computed: {
        auth() {
            return this.$store.gettersAuth
        }
    },

    watch: {
        search() {
            if(!this.waitingSearch) {
                setTimeout(() => {
                    if(this.search != '') {
                        this.$axios.get(`v1/volumes?q=${this.search}`)
                        .then(data => {
                            this.books = data.data.items
                        })
                        this.waitingSearch = false;
                    }
                }, 500)
            }

            this.waitingSearch = true
        }
    }
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

.books {

    &-table {
        padding: 20px;
        max-width: 1200px;
        margin: 20px auto;
    }

    &-item {
        padding: 20px;
        border: 1px solid #191919;
        border-bottom: none;
        display: flex;
        align-items: center;

        &:nth-child(2n) {
            background: #191919;
            color: #fff;
        }

        &:last-child {
            border-bottom: 1px solid #191919;
        }

        &__img {
            width: 100px;
            height: 100px;
            flex-shrink: 0;
            margin-right: 20px;

            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: contain;
            }
        }

        &__name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }

    &-search {
        background: #191919;
        padding: 15px 20vw;
        display: flex;
        align-items: center;
        color: #fff;

        span {
            margin-left: 10px;
            cursor: pointer;
        }

        input {
            width: 100%;
            padding: 10px 20px;
            background: #323233;
            color: #fff;
            border-radius: 4px;
            font-weight: 300;
            font-size: 15px;
            border: none;
            outline: none;

            &::placeholder {
                color: #9C9C9C;
            }
        }

        img {
            margin-left: 10px;
        }
    }

    &-none {
        height: 300px;
        text-align: center;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

@media (max-width: 767.98px) {
    .books {
        &-search {
            padding: 15px 20px;
        }

        &-table {
            margin-top: 0;
        }

        &-item {
            padding: 10px;

            &__img {
                width: 60px;
                height: 60px;
                margin-right: 10px;
            }

            &__name {
                font-size: 16px;
            }

            &__author {
                font-size: 12px;
            }
        }
    }
}
</style>