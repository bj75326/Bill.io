{{#if canvasPractise}}
    {{#each canvasPractise}}
        <a class="case" href="{{this.href}}" ontouchstart="">
            <span class="icon"><i class="fa {{this.icon}}" aria-hidden="true"></i></span>
            <span class="name">{{this.name}}</span>
            <span class="arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </a>
    {{/each}}
{{else}}
    <p class="sorry">(ﾟ∀ﾟ　)</p>
    <p class="sorry">暂时木有，看看其它</p>
{{/if}}