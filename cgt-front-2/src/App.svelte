<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import { onMount } from 'svelte';
  import { strapiData, fetchStrapiData } from './lib/strapi'
  import Nav from './components/Nav.svelte';
  import Home from "./components/Home.svelte";
  import Article from "./components/article.svelte";
  import Footer from "./components/Footer.svelte";

  onMount(fetchStrapiData);

  Notification.requestPermission()

  let subscription;

  async function init() {
    const serviceWorker = await navigator.serviceWorker.ready;
    subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BPZior0wRf-yMr2cVmudbb8TNCaGKrV4eFGf1sy-XBai_Du7HO0yilSW9cY60joVbMGqySTrddIXvuEj1n9MP-I",
    });
    console.log(subscription)
  }

  init()

  function handleClick() {
    console.log(subscription)
    this.subscriptionState = "loading";
      fetch(`http://localhost:1337/api/user-notification-keys`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            subscription,
          }
        }),
      })
  }
</script>
<Router>
  <button class="btn btn-error" on:click={handleClick}>DEBUG NOTIF</button>


  <div class="alert alert-error shadow-lg">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Toustes en grève le 6 juin 2023 !!</span>
    </div>
  </div>

  <Nav />

  <Route path="/">
    <Home />
  </Route>

  <Route path="/article/:id" let:params>
    <Article />
  </Route>



  <Footer/>
</Router>
