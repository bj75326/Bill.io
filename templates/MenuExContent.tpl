{{#if content}}
    {{#each content}}
        <div class="menuEx-card">
            <section>{{this.content}}</section>
        </div>
    {{/each}}
{{else}}
    <p>Parse Data issue...</p>
{{/if}}