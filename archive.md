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

<time class="post-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time> <a class="post-title post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>

</p>
{% endfor %}
