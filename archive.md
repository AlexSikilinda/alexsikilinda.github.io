---
layout: page
title: Archive
---

<!-- ## Blog Posts -->

{% for post in site.posts %}
{% assign currentdate = post.date | date: "%Y" %}
{% if currentdate != date %}
{% assign total = 0 %}
{% for yearpost in site.posts %}
{% assign postdate = yearpost.date | date: "%Y" %}
{% if postdate == currentdate %}
{% assign total = total | plus: 1 %}
{% endif %}
{% endfor %}

<h2>
  {{ currentdate }}
  <small class="text-muted">{{ total }} post(s)</small>
</h2>

{% assign date = currentdate %}
{% endif %}

<p>

<span class="post-date">{{ post.date | date_to_string }}</span> <a class="post-title post-link" href="{{ post.url }}">{{ post.title }}</a>

</p>
{% endfor %}
