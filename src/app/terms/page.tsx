import Container from '@/components/Container/Container';
import styles from './Term.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - WarungIndoMichigan',
};

const TermsPage = () => {
  return (
    <div className={styles.termsPage}>
      <Container>
        <article className={styles.content}>
          <h1>Legal Terms & Conditions</h1>
          <p className={styles.intro}>
            Please read the following information carefully before using this site. By using this site you agree to these terms and conditions.
            If you do not agree to these terms and conditions, please do not use this site.
          </p>

          <h2>General Information</h2>
          <p>
            The terms and conditions herein apply to WarungIndoMichigan, its affiliates, divisions, contractors, and all data sources and suppliers that have been referenced herein.
            The terms and conditions herein are in addition to, and do not override, the specific terms and conditions that apply to the products or services offered by WarungIndoMichigan.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            INFORMATION AND PRODUCTS OR SERVICES OFFERED ON THIS WEB SITE ARE PROVIDED 'AS IS' WITHOUT ANY EXPRESS OR IMPLIED WARRANTY OF ANY KIND,
            INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. IN NO EVENT WILL WARUNGINMICHIGAN BE LIABLE TO ANY PARTY FOR ANY DAMAGES OF ANY KIND,
            INCLUDING BUT NOT LIMITED TO DIRECT, INDIRECT, SPECIAL, OR CONSEQUENTIAL DAMAGES FOR ANY USE OF THIS WEB SITE OR ANY LINKED WEB SITE,
            INCLUDING WITHOUT LIMITATION, LOST PROFITS, LOSS OF USE, BUSINESS INTERRUPTION, OR OTHER ECONOMIC LOSSES, LOSS OF PROGRAMS OR OTHER DATA,
            WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, EVEN IF WARUNGINMICHIGAN IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF WARRANTIES OR DAMAGES.
          </p>
          <p>
            IN NO EVENT WILL WARUNGINMICHIGAN WARRANT OR GUARANTY THE CORRECTNESS, COMPREHENSIVENESS, COMPLETENESS, ACCURACY, TIMELINESS,
            MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OF ANY INFORMATION, PRODUCTS, OR SERVICES ON THIS WEB SITE.
          </p>
          <p>
            The information, products, and services available on this Web site may include technical inaccuracies or typographical errors.
          </p>

          <h2>Trademarks</h2>
          <p>
            WarungIndoMichigan and the WarungIndoMichigan logo are trademarks or registered trademarks of WarungIndoMichigan.
            Other products and company names mentioned herein may be the trademarks of their respective owners. No use of any WarungIndoMichigan trademark may be made by any third party without express written consent.
          </p>

          <h2>Copyright</h2>
          <p>
            © {new Date().getFullYear()} WarungIndoMichigan. All rights reserved. No part of this Web site may be reproduced, modified, or distributed in any form or manner without the prior written permission of WarungIndoMichigan.
          </p>
        </article>
      </Container>
    </div>
  );
};

export default TermsPage;
