<script setup>
import { currentUser, userRole } from '../auth'
</script>

<template>
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <section class="card border-danger shadow-sm p-4">
          <div class="d-flex align-items-center gap-3 mb-3">
            <span class="badge bg-danger fs-6">
              Admin Only
            </span>

            <h1 class="mb-0">
              Administrator Dashboard
            </h1>
          </div>

          <p>
            This page can only be accessed by users with the
            <strong>admin</strong> role.
          </p>

          <hr />

          <dl class="row mb-0">
            <dt class="col-sm-4">Signed-in user</dt>
            <dd class="col-sm-8">
              {{ currentUser?.email }}
            </dd>

            <dt class="col-sm-4">Current role</dt>
            <dd class="col-sm-8">
              <span class="badge bg-danger">
                {{ userRole }}
              </span>
            </dd>

            <dt class="col-sm-4">Access level</dt>
            <dd class="col-sm-8">
              Full administrator access
            </dd>
          </dl>
        </section>
      </div>
    </div>
  </main>
</template>