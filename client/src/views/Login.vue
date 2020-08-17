<template>
    <div>
        <p>
            账号： <input type="text" v-model="loginId">
        </p>
        <p>
            密码： <input type="password" v-model="loginPwd">
        </p>
        <p>
            <button @click="handleClick">Login</button>
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginId: "",
            loginPwd: ""
        } 
    },
    methods: {
        async handleClick(){
            const resp = await this.$store.dispatch("loginUser/login", {
                loginId: this.loginId,
                loginPwd: this.loginPwd
            })
            if(resp){
                this.$router.push("/")
            }else{
                alert("账号密码错误")
            }
        }
    }
}
</script>

<style scoped>

</style>