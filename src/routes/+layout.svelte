<script>
	import { base } from '$app/paths';
	import '../app.pcss';
</script>

<div class="flex h-[calc(100dvh)] w-screen flex-col">
	<div class="navbar bg-base-300">
		<div class="navbar-start"></div>
		<div class="navbar-center">
			<a href="{base}/" class="btn btn-ghost bg-neutral text-xl text-neutral-content">Oracle</a>
		</div>
		<div class="navbar-end">
			<ul class="menu menu-horizontal">
				<li>
					<a href="{base}/settings" class="btn btn-ghost bg-neutral text-neutral-content"
						>Settings</a
					>
				</li>
			</ul>
		</div>
	</div>
	<div class="container m-auto flex h-[calc(100dvh-65px)] w-full flex-col bg-base-100 p-2">
		<slot />
	</div>
</div>
