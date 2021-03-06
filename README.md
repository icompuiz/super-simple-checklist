# super-simple-checklist
Super Simple Checklist is just that, a super simple checklist. Super Simple Checklist stores your completed tasks and notes in local storage, so it is great for quickly managing your todo list.

## Usage

### Initialize your application

```
angular
		.module('my-checklist', ['ss-checklist'])
		.config(ConfigBlock);

		ConfigBlock.$inject = ['ssChecklistProvider'];
		function ConfigBlock(ssChecklistProvider) {
			ssChecklistProvider.setLocalStoragePrefix('my-checklist'); // Specify a prefix for local storage. Otherwise, use ss-checklist as the prefix.
		}
```

### Create a task

```(html)
<ul>
	<li>
		<div class="checkbox" ss-task> <!-- use the inner text as the key for local storage -->
			<input type="checkbox"> Create a checklist.
		</div>
	</li>
</ul>
```

or explicitly specify the task's key

```(html)
<ul>
	<li>
		<div class="checkbox" ss-task="my-first-task">
			<input type="checkbox"> Create a checklist.
		</div>
	</li>
</ul>
```

### Add some notes (if you dare)
```
<ul>
	<li>
		<div class="checkbox" ss-task>
			<input type="checkbox"> Create a checklist.
		</div>
		<textarea class="ss-notes" ss-notes></textarea>
	</li>
</ul>
```

## Features to come
Super simple checklist will remain super simple, it is really just a mechanism for storing information in local storage. I can envision another simple application built around SSC that allows you to add and remove tasks, but that kind of functionality is out of scope for this simple module.
