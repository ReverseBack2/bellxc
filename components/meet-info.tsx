import Link from "next/link";
import { ArrowUpRight, FileText, Flag, Trophy } from "lucide-react";

const uniformPdfData = "data:application/pdf;base64,JVBERi0xLjMKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjEgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YyIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNCAwIG9iago8PAovQ29udGVudHMgOSAwIFIgL01lZGlhQm94IFsgMCAwIDYxMiA3OTIgXSAvUGFyZW50IDggMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNjEyIDc5MiBdIC9QYXJlbnQgOCAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNiAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDggMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9BdXRob3IgKGFub255bW91cykgL0NyZWF0aW9uRGF0ZSAoRDoyMDI2MDgxNzAzNTMxMSswMCcwMCcpIC9DcmVhdG9yIChhbm9ueW1vdXMpIC9LZXl3b3JkcyAoKSAvTW9kRGF0ZSAoRDoyMDI2MDgxNzAzNTMxMSswMCcwMCcpIC9Qcm9kdWNlciAoUmVwb3J0TGFiIFBERiBMaWJyYXJ5IC0gXChvcGVuc291cmNlXCkpIAogIC9TdWJqZWN0ICh1bnNwZWNpZmllZCkgL1RpdGxlICh1bnRpdGxlZCkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9Db3VudCAyIC9LaWRzIFsgNCAwIFIgNSAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTI0NAo+PgpzdHJlYW0KR2F0PSpfL0E5ayZBQE82YmI3OmJfSStab1o+Qi90R1cvJ3FtMkJwWCdFTjZKVjZTIUMsI3NlYFgyIitiPCs5TSNcbnRpalRJQkBvY0ZjKSdgPVVFTXBBW1BgRTBKMThba1lnMmE+WFlYLzptXyNwbF4tdG80JlViRExPXVhaYnEvUTVmQEJSVkZeaGxPdHRiSl51XSU1XVlCNkBvJjNmZUhBJkpHWm8zZkYrVERRNystL1xJZTw/R1I5SHVTYCg8bSlzals0S0RRZmlTTUlZJDg4JDxHYzowQ1xmNm5VJjFranJRMztGXDMwKVNeVylSMGNzcFhGcFE1a1c4UnNIUmQzRjYiT2VpO2JtNShnKSQ6OHM4WlIxZCdjTUArVSNPQig+UVhuOTsmVl8yNCgxRWhkLmg2JDFtVygrb1RoVi9aJi5ZUFJVQmtZQzwoMy9qSFZGJ202bGQ2Z3QjXyQiOCheaidPJCVrKUdoQTtoKz1rS1xldE5jaSEqaidRLmdqamtLJ1EiKDVLdFZpREJnYUBuLjUwJCErRDYuVihxLjZHazZvcEpTRCIuKjY2OSgpdC5kOEVwJ2I6XUVISGFZWyxbOWo1Oj1ITkdfaz07KihdQmU4Z2AjaiNDNkQybiE8cmR0ZyhpYFgobE48ODBBbCg1X2RsQEEycV1OWVBkak4lODAwT09yMjRDJkZgSj5uNDE6S0w6XktQT2Y+Pj5ebigsOSFuTU5tQypsJjM5KUc+c2cnImVSST87SG0mZVtmSF1mamA4Omk7LzJUbSYtcCgvKC4lKmRzLWE+aHFVLVg4N05HJG5tNlA0Um8yKXVTKDgwWlwvU3MmZylqQEhXIWk5TSsyJjhvR19zNkdmRUYtYVBoSzpuLz5Vc1IxN2wvQjoiODVlXk5NUyxsUScvUDk7b0UtTGUldSRhJ1dZbG1mLnVHP2htQ0IjPFJIby46XkYlQms5PTZuNUs6WCNwI01odC5nNDBzbmIjN05nIkpjUVJLQVx0WV1MZyZdSzorN0FHczc8Ty5fQzVocjdiJzdoUXBKXD91MDJGRixvPi00Zm10ME45KzA3Ky5RWjlMKkVqTD8pLTpHSVVbOSIpTE4iJGVbUm5uL29zbiwtQHJxLyFcJUQ2bSViX2AhWlNOXFJdRF8vVSg1R2YzLzVfJ0lOZ0ojXGs/LkBCUSZgMlAyNnEraGQlQiVNVkJyYmFhPzNVJzc2UiJMLD5WI0U1bk9mIjVCLFZLdD1YUUxHWEJIV1soNT9vSTpUKTVjSjk0JiFhSCEuRFhrWVdAWURJYyxEXzZkaWYrViwpYWVsNlc2I3RXZnRMXSEobjRAV2ldOT5jSy1PRF5ZQW5MLUEuVGxtQl02KlA0My1cUVBZKkVpYTRmUnEja15VL3FqcDI7PjxKKmg8KyJJXDM0YGZHPCItdSpGWStWSWQyOjBcJ1c2bColZlxWNT1CJGY9altyVi1ARnJ1YSdZaXBiQ3NOMylWMiVbPWswKFRScD1xZ11QNiFJV1IlaTEnL2c0KVRJWkFITC1JMV9RZUtkIlwjTVNbJUs9Pm8oQk1vQlo4OkkqWEtcVlA7YW4/KTZfMiglcDxIX29iYV4tRVkyPWB0TStLTzQ9WjF1VUdcQjdcaGFtOCREXFZ1XCk/fj5lbmRzdHJlYW0KZW5kb2JqCjEwIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDEwOTUKPj4Kc3RyZWFtCkdhdD0pOW9uJGUmQUA3LjlRK2JbMVI7ayNsZy0nOSxmUUxJXDsyLj40XTleIUBbPyNQcjI/Qj9ULTw8NUcqQFgtKUUmImwsMl4lWW80RkIrUzNMMFFYYTVNZSIyJnJINidmRV5KU1pkJEU0Q1AwTERPWWZMWzZMbmtGIWE0WF8wIztlWFVpZVFnJWNkNUFyZFNwM1lIWzUoLEQ8ciFSLStxXmxgV0I+OzdAMUU6amxOOzYvS1ZqTFU+WHFLbGdXZEZKJzYzYG5eMFRWXXAiWGw6cGBySTU2X0xVNCJPVyJGXiU5YlMnTUA2cC9sYTgtQSQlKGhzWycxTF45Ijs+T3FdRT9JKFc3TUk1bD1SNypeMSUiQUElaSxldV0yPVRMQHRaJy0na1FFJSFhQFIyY0UoSzJwPkVCSzxAQCs8PC5RZWpmTERkNlo7U2RqIlM0O0o4LSFONnJmdUVZUyJMUmRoaTNWW089azBiR2dKQTcvPicsPkNRT0VYNFYmMi5yZnFjOlo4NVolYmphSz1kSUhWRChdNF5QNGpRciZaPGJbPUMySlNAMGxxNjgtWyljUEwmMSwoT1ZYQ1RjVzs/a0leMU81TXVaOmU7TlY5QE9RJHFaJ2ttIjBAVTQsSUdNc2UvKV41InVwZD5RcVU8VW46MFNKL3BgaD80OWE/aEUjPWRcby1ldGIwcVApJzdeMF5yKG0kO2xKblh0SkZYOEBwRWdeL3AnNT1hdTBbTUxgJEkwPGcxaD1xTj8+VlQwNSVYXmZBXzoxLCVebSgxW2ovRFhDcC1WOSI7ZGxyPlxXLWdhUkdDSE1TZC4zV0pTJCtRU2Ndc0kzZ2QhKF0xNjBydFxvVU1cRWxMYVVqcm1ZXm4jOz0udUEmN29SVWBELC5rZ1FHQlFbMjVoaW40YDBNWlQ8NTNfPWtULHJoLHJBQG9gLTRqRXRZVzJaKDw0VzwjYExgWGU0bikjSiNFLF5lbmdqRCQ7ZiVdJF1CP0FBdSd0SD1ZSm1dLXVSVW0yKWIyR1NtNEVRKWVALyU4c11EJj9OMXMiTjRtMG5Qa1xHOVFQQ0plakMoam9XZltoRT0tWHQ0Oz84RlslNm1HKV06JGRscXVkaUZsYlV1a0ZDSitVNVIoLi1dKyE9Pi4nbisya2VlRz1zKDdOa2NTQFA4b29uTWVKYm1vMXAoJWcuQyJgdDgnLiRVLClcN15RXl81MjtXcCdSZSopKEMpOG5TXE48bk4xbCtBaVpuWUMmWUMyYztrRjpEZWpfRzRlcnAhP1FzUzlscm1aQTp1YzQ1cGFZVWZmJChnUCFiTlxdQ1onSGcuJ10ra2QtYXI1V2dfKEZNYGUyLD9lLkI5PUI8RnFfcDtwUWEjIU1IS0dfMyksZHRHJlsnSG1WYCdSTzcjUUpwI2BnLkg4L2Nfb3QjWkIqXi5SbXE0bEYuaVtZV0s3IjV+PmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDExCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA2MSAwMDAwMCBuIAowMDAwMDAwMTAyIDAwMDAwIG4gCjAwMDAwMDAyMDkgMDAwMDAgbiAKMDAwMDAwMDMyMSAwMDAwMCBuIAowMDAwMDAwNTE0IDAwMDAwIG4gCjAwMDAwMDA3MDggMDAwMDAgbiAKMDAwMDAwMDc3NiAwMDAwMCBuIAowMDAwMDAxMDM3IDAwMDAwIG4gCjAwMDAwMDExMDIgMDAwMDAgbiAKMDAwMDAwMjQzNyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzwzNjgzMmZjOTY1OGVmZjA1ODE1YzhhNzI2YjIwNzU3OT48MzY4MzJmYzk2NThlZmYwNTgxNWM4YTcyNmIyMDc1Nzk+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDcgMCBSCi9Sb290IDYgMCBSCi9TaXplIDExCj4+CnN0YXJ0eHJlZgozNjI0CiUlRU9GCg==";

const PageHead = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <header className="page-head"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p className="lede">{intro}</p>}</header>
);

export function MeetInfoPage() {
  return (
    <div className="content-page">
      <PageHead eyebrow="Race day, decoded" title="Meet info" intro="New to cross country? Start here for quick guides to meets, uniforms, and what to expect." />
      <section className="feature-links">
        <Link href="/meet101"><span className="icon-box"><Flag /></span><span><small>Start here</small><strong>Meet 101</strong><em>A practical parent and runner guide</em></span><ArrowUpRight /></Link>
        <Link href="/uniform101"><span className="icon-box"><FileText /></span><span><small>Race-day kit</small><strong>XC Uniform 101</strong><em>Singlet, shorts, shoes, warmups & gear</em></span><ArrowUpRight /></Link>
        <Link href="/meet-types"><span className="icon-box"><Trophy /></span><span><small>Know the season</small><strong>Meet Types</strong><em>Invitationals, WCAL, CCS, and State</em></span><ArrowUpRight /></Link>
      </section>
    </div>
  );
}

export function Uniform101Page() {
  return (
    <div className="content-page">
      <PageHead eyebrow="Race-day kit" title="XC Uniform 101" intro="What Bellarmine runners need for race day, plus useful optional gear." />
      <section className="document-card">
        <div>
          <FileText />
          <h2>Cross Country Kit 101</h2>
          <p>The two-page August 2026 guide covers the required Bellarmine singlet and race bib, navy shorts, running shoes, warmups, watches, snacks, sunscreen, and recovery items.</p>
          <a className="text-link" href={uniformPdfData} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight /></a>
          <a className="text-link" href={uniformPdfData} download="XC Uniform 101.pdf">Download PDF <ArrowUpRight /></a>
        </div>
        <iframe src={uniformPdfData} title="Bellarmine XC Uniform 101 guide" />
      </section>
    </div>
  );
}
