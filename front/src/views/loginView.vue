<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" required>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="formData.password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import  AxiosInstance  from '../../axios';
export default {
  name: 'loginComponent',
  data() {
    return {
        formData: {
      email: '',
      password: ''}
    }
  },
  methods: {
    login() {
                    // Send a POST request with the form data to your backend API
                    // You can use libraries like Axios or the native Fetch API for this
                    // Example with Axios:
                    console.log("formdata",this.formData)
                    AxiosInstance.post('/api/login', this.formData)
                        .then(response => {
                            // Handle the response from the server
                            const token = response.data.token;
                            AxiosInstance.defaults.headers.common['Authorization'] = token;
                            sessionStorage.setItem('token', token); // For session-only storage
                            console.log("tokeeen",token)
                            if (response.data.connected === true){
                                console.log('connected')
                                 this.$router.push('/admin'); // Replace '/dashboard' with the URL you want to redirect to
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            console.log("error")
                            // Handle any errors
                        });
                },
    
    
  }
}
</script>