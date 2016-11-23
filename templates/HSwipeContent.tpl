<div class="horizontalSwipe-content">
    {{#if content}}
        {{#limit_each content 6}}
        {{/limit_each}}
    {{else}}
        <p>Parse Data issue...</p>
    {{/if}}
</div>
<div class="horizontalSwipe-pageNumber">
    <div class="now"></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
</div>