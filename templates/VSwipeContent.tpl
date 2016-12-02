<div class="verticalSwipe-content">
    {{#if content}}
        {{#limit_each_VS content 6}}
        {{/limit_each_VS}}
    {{else}}
        <p>Parse Data issue...</p>
    {{/if}}
</div>
<div class="verticalSwipe-pageNumber">
    <div class="now"></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
</div>