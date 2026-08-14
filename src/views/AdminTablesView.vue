<script setup>
import { computed, onMounted, ref } from 'vue'
import { currentUser, userRole } from '../auth'

const serviceSearch = ref('')
const requestSearch = ref('')

const serviceSortKey = ref('name')
const serviceSortDirection = ref('asc')
const requestSortKey = ref('createdAt')
const requestSortDirection = ref('desc')

const servicePage = ref(1)
const requestPage = ref(1)
const pageSize = 10

const services = ref([
  {
    id: 1,
    name: 'Migrant Friendly GP Clinic',
    type: 'GP Clinics',
    suburb: 'Clayton',
    postcode: '3168',
    language: 'Mandarin',
    openingHours: 'Mon-Fri 9:00-17:00',
  },
  {
    id: 2,
    name: 'Community Health Centre',
    type: 'Community Health Centres',
    suburb: 'Caulfield',
    postcode: '3162',
    language: 'Arabic',
    openingHours: 'Mon-Fri 8:30-16:30',
  },
  {
    id: 3,
    name: 'Multicultural Translation Service',
    type: 'Translation Services',
    suburb: 'Melbourne',
    postcode: '3000',
    language: 'Vietnamese',
    openingHours: 'Mon-Sat 10:00-18:00',
  },
  {
    id: 4,
    name: 'Settlement and Health Support Hub',
    type: 'Settlement Support',
    suburb: 'Dandenong',
    postcode: '3175',
    language: 'Hindi',
    openingHours: 'Mon-Fri 9:30-17:30',
  },
  {
    id: 5,
    name: 'Family Health Support Clinic',
    type: 'GP Clinics',
    suburb: 'Box Hill',
    postcode: '3128',
    language: 'Mandarin',
    openingHours: 'Mon-Fri 9:00-18:00',
  },
  {
    id: 6,
    name: 'Refugee Health Nurse Service',
    type: 'Community Health Centres',
    suburb: 'Springvale',
    postcode: '3171',
    language: 'Vietnamese',
    openingHours: 'Tue-Fri 9:00-16:00',
  },
  {
    id: 7,
    name: 'Arabic Health Interpreter Service',
    type: 'Translation Services',
    suburb: 'Brunswick',
    postcode: '3056',
    language: 'Arabic',
    openingHours: 'Mon-Fri 10:00-17:00',
  },
  {
    id: 8,
    name: 'Women and Family Health Centre',
    type: 'Community Health Centres',
    suburb: 'Footscray',
    postcode: '3011',
    language: 'Hindi',
    openingHours: 'Mon-Fri 8:30-17:00',
  },
  {
    id: 9,
    name: 'Student Migrant Health Clinic',
    type: 'GP Clinics',
    suburb: 'Carlton',
    postcode: '3053',
    language: 'Mandarin',
    openingHours: 'Mon-Thu 9:00-17:00',
  },
  {
    id: 10,
    name: 'Community Legal and Settlement Help',
    type: 'Settlement Support',
    suburb: 'Richmond',
    postcode: '3121',
    language: 'Arabic',
    openingHours: 'Mon-Fri 10:00-16:00',
  },
  {
    id: 11,
    name: 'Preventive Care Information Centre',
    type: 'Community Health Centres',
    suburb: 'Glen Waverley',
    postcode: '3150',
    language: 'Mandarin',
    openingHours: 'Mon-Fri 9:00-15:30',
  },
  {
    id: 12,
    name: 'Multilingual Appointment Support',
    type: 'Translation Services',
    suburb: 'Noble Park',
    postcode: '3174',
    language: 'Vietnamese',
    openingHours: 'Mon-Sat 9:30-17:30',
  },
])

const supportRequests = ref([])

const mockSupportRequests = [
  {
    id: 1001,
    supportType: 'Booking a GP appointment',
    preferredLanguage: 'Mandarin',
    contactMethod: 'Email',
    urgency: 'Medium',
    status: 'Submitted',
    createdAt: '2026/08/01 09:30:00',
  },
  {
    id: 1002,
    supportType: 'Finding a translator',
    preferredLanguage: 'Arabic',
    contactMethod: 'Phone call',
    urgency: 'High',
    status: 'In progress',
    createdAt: '2026/08/02 10:20:00',
  },
  {
    id: 1003,
    supportType: 'Understanding a medical letter',
    preferredLanguage: 'Hindi',
    contactMethod: 'SMS',
    urgency: 'Low',
    status: 'Submitted',
    createdAt: '2026/08/03 11:10:00',
  },
  {
    id: 1004,
    supportType: 'Asking a health worker',
    preferredLanguage: 'Vietnamese',
    contactMethod: 'Email',
    urgency: 'Medium',
    status: 'Resolved',
    createdAt: '2026/08/04 12:45:00',
  },
  {
    id: 1005,
    supportType: 'Other support',
    preferredLanguage: 'English',
    contactMethod: 'Phone call',
    urgency: 'Low',
    status: 'Submitted',
    createdAt: '2026/08/05 13:20:00',
  },
  {
    id: 1006,
    supportType: 'Booking a GP appointment',
    preferredLanguage: 'Arabic',
    contactMethod: 'SMS',
    urgency: 'High',
    status: 'In progress',
    createdAt: '2026/08/06 14:00:00',
  },
  {
    id: 1007,
    supportType: 'Finding a translator',
    preferredLanguage: 'Mandarin',
    contactMethod: 'Email',
    urgency: 'Medium',
    status: 'Submitted',
    createdAt: '2026/08/07 15:25:00',
  },
  {
    id: 1008,
    supportType: 'Understanding a medical letter',
    preferredLanguage: 'Vietnamese',
    contactMethod: 'Phone call',
    urgency: 'High',
    status: 'Submitted',
    createdAt: '2026/08/08 16:40:00',
  },
  {
    id: 1009,
    supportType: 'Asking a health worker',
    preferredLanguage: 'Hindi',
    contactMethod: 'Email',
    urgency: 'Low',
    status: 'Resolved',
    createdAt: '2026/08/09 09:15:00',
  },
  {
    id: 1010,
    supportType: 'Other support',
    preferredLanguage: 'Mandarin',
    contactMethod: 'SMS',
    urgency: 'Medium',
    status: 'In progress',
    createdAt: '2026/08/10 10:35:00',
  },
  {
    id: 1011,
    supportType: 'Booking a GP appointment',
    preferredLanguage: 'English',
    contactMethod: 'Email',
    urgency: 'Low',
    status: 'Submitted',
    createdAt: '2026/08/11 11:50:00',
  },
  {
    id: 1012,
    supportType: 'Finding a translator',
    preferredLanguage: 'Arabic',
    contactMethod: 'Phone call',
    urgency: 'High',
    status: 'Submitted',
    createdAt: '2026/08/12 12:30:00',
  },
]

function loadSupportRequests() {
  try {
    const storedRequests = JSON.parse(localStorage.getItem('supportRequests') || '[]')
    supportRequests.value = [...storedRequests, ...mockSupportRequests]
  } catch {
    supportRequests.value = mockSupportRequests
  }
}

function sortTable(type, key) {
  if (type === 'services') {
    if (serviceSortKey.value === key) {
      serviceSortDirection.value = serviceSortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      serviceSortKey.value = key
      serviceSortDirection.value = 'asc'
    }
  }

  if (type === 'requests') {
    if (requestSortKey.value === key) {
      requestSortDirection.value = requestSortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      requestSortKey.value = key
      requestSortDirection.value = 'asc'
    }
  }
}

function sortIcon(type, key) {
  if (type === 'services' && serviceSortKey.value === key) {
    return serviceSortDirection.value === 'asc' ? '↑' : '↓'
  }

  if (type === 'requests' && requestSortKey.value === key) {
    return requestSortDirection.value === 'asc' ? '↑' : '↓'
  }

  return ''
}

function compareValues(a, b, key, direction) {
  const valueA = String(a[key] || '').toLowerCase()
  const valueB = String(b[key] || '').toLowerCase()

  if (valueA < valueB) {
    return direction === 'asc' ? -1 : 1
  }

  if (valueA > valueB) {
    return direction === 'asc' ? 1 : -1
  }

  return 0
}

const filteredServices = computed(() => {
  const keyword = serviceSearch.value.trim().toLowerCase()

  const filtered = services.value.filter((service) => {
    return (
      service.name.toLowerCase().includes(keyword) ||
      service.type.toLowerCase().includes(keyword) ||
      service.suburb.toLowerCase().includes(keyword) ||
      service.postcode.toLowerCase().includes(keyword) ||
      service.language.toLowerCase().includes(keyword)
    )
  })

  return filtered.sort((a, b) =>
    compareValues(a, b, serviceSortKey.value, serviceSortDirection.value),
  )
})

const filteredRequests = computed(() => {
  const keyword = requestSearch.value.trim().toLowerCase()

  const filtered = supportRequests.value.filter((request) => {
    return (
      String(request.supportType || '').toLowerCase().includes(keyword) ||
      String(request.preferredLanguage || '').toLowerCase().includes(keyword) ||
      String(request.contactMethod || '').toLowerCase().includes(keyword) ||
      String(request.urgency || '').toLowerCase().includes(keyword) ||
      String(request.status || '').toLowerCase().includes(keyword) ||
      String(request.createdAt || '').toLowerCase().includes(keyword)
    )
  })

  return filtered.sort((a, b) =>
    compareValues(a, b, requestSortKey.value, requestSortDirection.value),
  )
})

const totalServicePages = computed(() => {
  return Math.max(1, Math.ceil(filteredServices.value.length / pageSize))
})

const totalRequestPages = computed(() => {
  return Math.max(1, Math.ceil(filteredRequests.value.length / pageSize))
})

const paginatedServices = computed(() => {
  const start = (servicePage.value - 1) * pageSize
  return filteredServices.value.slice(start, start + pageSize)
})

const paginatedRequests = computed(() => {
  const start = (requestPage.value - 1) * pageSize
  return filteredRequests.value.slice(start, start + pageSize)
})

function previousPage(type) {
  if (type === 'services' && servicePage.value > 1) {
    servicePage.value--
  }

  if (type === 'requests' && requestPage.value > 1) {
    requestPage.value--
  }
}

function nextPage(type) {
  if (type === 'services' && servicePage.value < totalServicePages.value) {
    servicePage.value++
  }

  if (type === 'requests' && requestPage.value < totalRequestPages.value) {
    requestPage.value++
  }
}

function resetServiceSearch() {
  serviceSearch.value = ''
  servicePage.value = 1
}

function resetRequestSearch() {
  requestSearch.value = ''
  requestPage.value = 1
}

onMounted(() => {
  loadSupportRequests()
})
</script>

<template>
  <main class="container py-4">
    <section>
      <h1>Admin Interactive Tables</h1>
      <p class="text-muted">
        Search, sort, and review service data and support request data.
      </p>

      <div v-if="!currentUser || userRole !== 'admin'" class="alert alert-danger">
        This page is only available for admin users. Please log in with an admin
        account to access the interactive data tables.
      </div>

      <div v-else>
        <div class="alert alert-info">
          Logged in as <strong>{{ currentUser.email }}</strong>.
          This admin page demonstrates interactive table data with search, sorting,
          and pagination.
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="d-flex justify-content-between flex-wrap gap-3 mb-3">
              <div>
                <h5 class="card-title mb-1">Health Services Table</h5>
                <p class="text-muted mb-0">
                  Search and sort mock health service records.
                </p>
              </div>

              <div class="admin-table-search">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Search services"
                    v-model="serviceSearch"
                    @input="servicePage = 1"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="resetServiceSearch"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle admin-table">
                <thead>
                  <tr>
                    <th scope="col" @click="sortTable('services', 'name')">
                      Name {{ sortIcon('services', 'name') }}
                    </th>
                    <th scope="col" @click="sortTable('services', 'type')">
                      Type {{ sortIcon('services', 'type') }}
                    </th>
                    <th scope="col" @click="sortTable('services', 'suburb')">
                      Suburb {{ sortIcon('services', 'suburb') }}
                    </th>
                    <th scope="col" @click="sortTable('services', 'postcode')">
                      Postcode {{ sortIcon('services', 'postcode') }}
                    </th>
                    <th scope="col" @click="sortTable('services', 'language')">
                      Language {{ sortIcon('services', 'language') }}
                    </th>
                    <th scope="col">Opening Hours</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="service in paginatedServices" :key="service.id">
                    <td>{{ service.name }}</td>
                    <td>{{ service.type }}</td>
                    <td>{{ service.suburb }}</td>
                    <td>{{ service.postcode }}</td>
                    <td>{{ service.language }}</td>
                    <td>{{ service.openingHours }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span class="text-muted">
                Showing page {{ servicePage }} of {{ totalServicePages }}
                · {{ filteredServices.length }} record(s)
              </span>

              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  :disabled="servicePage === 1"
                  @click="previousPage('services')"
                >
                  Previous
                </button>

                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  :disabled="servicePage === totalServicePages"
                  @click="nextPage('services')"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between flex-wrap gap-3 mb-3">
              <div>
                <h5 class="card-title mb-1">Support Requests Table</h5>
                <p class="text-muted mb-0">
                  Search and sort submitted support request records.
                </p>
              </div>

              <div class="admin-table-search">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Search requests"
                    v-model="requestSearch"
                    @input="requestPage = 1"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="resetRequestSearch"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle admin-table">
                <thead>
                  <tr>
                    <th scope="col" @click="sortTable('requests', 'supportType')">
                      Support Type {{ sortIcon('requests', 'supportType') }}
                    </th>
                    <th scope="col" @click="sortTable('requests', 'preferredLanguage')">
                      Language {{ sortIcon('requests', 'preferredLanguage') }}
                    </th>
                    <th scope="col" @click="sortTable('requests', 'contactMethod')">
                      Contact {{ sortIcon('requests', 'contactMethod') }}
                    </th>
                    <th scope="col" @click="sortTable('requests', 'urgency')">
                      Urgency {{ sortIcon('requests', 'urgency') }}
                    </th>
                    <th scope="col" @click="sortTable('requests', 'status')">
                      Status {{ sortIcon('requests', 'status') }}
                    </th>
                    <th scope="col" @click="sortTable('requests', 'createdAt')">
                      Created At {{ sortIcon('requests', 'createdAt') }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="request in paginatedRequests" :key="request.id">
                    <td>{{ request.supportType }}</td>
                    <td>{{ request.preferredLanguage }}</td>
                    <td>{{ request.contactMethod }}</td>
                    <td>
                      <span
                        class="badge"
                        :class="{
                          'bg-success': request.urgency === 'Low',
                          'bg-warning text-dark': request.urgency === 'Medium',
                          'bg-danger': request.urgency === 'High',
                        }"
                      >
                        {{ request.urgency }}
                      </span>
                    </td>
                    <td>{{ request.status }}</td>
                    <td>{{ request.createdAt }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span class="text-muted">
                Showing page {{ requestPage }} of {{ totalRequestPages }}
                · {{ filteredRequests.length }} record(s)
              </span>

              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  :disabled="requestPage === 1"
                  @click="previousPage('requests')"
                >
                  Previous
                </button>

                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  :disabled="requestPage === totalRequestPages"
                  @click="nextPage('requests')"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
