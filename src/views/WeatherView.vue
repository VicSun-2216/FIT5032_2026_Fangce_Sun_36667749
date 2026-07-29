<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'

const city = ref('Clayton, AU')
const weatherData = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const weatherIconUrl = computed(() => {
  const iconCode = weatherData.value?.weather?.[0]?.icon

  if (!iconCode) {
    return ''
  }

  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
})

const searchWeather = async () => {
  const cityName = city.value.trim()

  weatherData.value = null
  errorMessage.value = ''

  if (!cityName) {
    errorMessage.value = 'Please enter a city name.'
    return
  }

  if (!apiKey) {
    errorMessage.value =
      'OpenWeather API key is missing. Please check the VITE_OPENWEATHER_API_KEY value in .env.'
    return
  }

  loading.value = true

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: cityName,
        appid: apiKey,
        units: 'metric',
      },
    })

    weatherData.value = response.data
  } catch (error) {
    console.error('Weather API request failed:', error)

    const status = error.response?.status

    if (status === 401) {
      errorMessage.value =
        'The API key is invalid or not active. Please check your OpenWeather API key.'
    } else if (status === 404) {
      errorMessage.value = 'City not found. Try a city such as Clayton, AU.'
    } else if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Unable to retrieve weather data. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4 p-md-5">
            <h1 class="text-center mb-2">Weather App</h1>

            <p class="text-center text-secondary mb-4">
              Search for the current weather by city.
            </p>

            <form class="input-group mb-4" @submit.prevent="searchWeather">
              <input
                v-model="city"
                type="text"
                class="form-control"
                placeholder="Enter city, for example Clayton, AU"
                aria-label="City name"
              />

              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Searching...' : 'Search' }}
              </button>
            </form>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <div v-if="weatherData" class="text-center">
              <h2 class="mb-1">
                {{ weatherData.name }}, {{ weatherData.sys.country }}
              </h2>

              <img
                v-if="weatherIconUrl"
                :src="weatherIconUrl"
                :alt="weatherData.weather[0].description"
                width="100"
                height="100"
              />

              <p class="display-5 fw-semibold mb-2">
                {{ weatherData.main.temp.toFixed(2) }} °C
              </p>

              <p class="fs-5 text-capitalize mb-2">
                {{ weatherData.weather[0].description }}
              </p>

              <p class="text-secondary mb-0">
                Feels like {{ weatherData.main.feels_like.toFixed(2) }} °C
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>