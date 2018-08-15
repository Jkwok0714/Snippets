# AppCue-y Test

```javascript
let appcue = new AppcueComponent([
  {
    message: t('appcue_1'),
    targetElementID: '#storyboard'
  },
  {
    message: t('appcue_2'),
    targetElementID: '.new-card'
  }
], '.browser-window');

appcue.begin();
```
