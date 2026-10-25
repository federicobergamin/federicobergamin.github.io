<!-- 
  This is your post body, written in plain Markdown. Delete this comment
  block once you're done reading it - it won't render (it's an HTML
  comment, passed through untouched).

  - Inline math:   $e^{i\pi} + 1 = 0$
  - Display math:  $$ \int_0^1 x^2\,dx = \tfrac{1}{3} $$
  - Captioned image (the caption goes inside the [] brackets):
      ![This is the caption](images/figure1.png)
  - Uncaptioned image (leave the [] brackets empty):
      ![](images/figure1.png)

  Put images anywhere inside this post's own folder - images/ is just a
  convention, not a requirement. Give each image its own paragraph (blank
  line before and after) so it gets wrapped as a proper figure. -->


## Relation between the vector field and the score function for generative modelling

> A short note written by Federico Bergamin (fedbe@dtu.dk) with the help of Stas Syrota (stasy@dtu.dk) and Aliaksandra Shysheya (as2975@cam.ac.uk). Note written in October 2024.


### Unconditional velocity field $u_t(x)$ and $\nabla \log p_t(x)$
Before starting we refresh the definition of probability path and velocity field as introduced in the Flow Matching paper by Lipman et al., as they will be useful to understand the derivations. These are given by:

$$
\begin{align*}
 p_t(x) &= \int p_t(x|x_1)q(x_1) d x_1 \\
 u_t(x) &= \int u_t(x|x_1)\frac{p_t(x|x_1)q(x_1)}{p_t(x)} d x_1
\end{align*}
$$

In addition to that, we know that for a Gaussian probability path $p_t(x|x_1) = \mathcal{N}(x|\alpha_t x_1,\sigma_t^2 \mathrm{I})$, then the conditional velocity field $u_t(x|x_1)$ can be derived as

$$
\begin{align*}
 u_t(x|x_1) = \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) + \dot{\alpha_t}x_1
\end{align*}
$$

We can rewrite this as follows (while I like the trick, I still have to figure out how one can think about this in the first place tbh, but that's life I suppose)
$$
\begin{align*}
 u_t(x|x_1) &= \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) + \dot{\alpha_t}x_1 \\
 &= \frac{\dot{\alpha_t}}{\alpha_t}x - \frac{\dot{\alpha_t}}{\alpha_t}x  + \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) + \dot{\alpha_t}x_1 \hspace{1.5cm} \text{revolutionary idea of adding 0} \\
 &= \frac{\dot{\alpha_t}}{\alpha_t}x + \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) - \frac{\dot{\alpha_t}}{\alpha_t}(x-\alpha x_1) \\
 &=  \frac{\dot{\alpha_t}}{\alpha_t}x - (x-\alpha x_1) \left( \frac{\dot{\alpha_t}}{\alpha_t} - \frac{\dot{\sigma_t}}{\sigma_t}\right)\\
 &= \frac{\dot{\alpha_t}}{\alpha_t}x  -  \frac{1}{\sigma_t \alpha_t}(x-\alpha x_1)(\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \\
 & = \frac{\dot{\alpha_t}}{\alpha_t}x + (\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1) 
\end{align*}
$$
where in the last derivation we used the fact that $\nabla \log p_t (x|x_1) = -\frac{1}{\sigma_t^2}(x - \alpha_t x_1)$ since $p_t (x|x_1) = \mathcal{N}(x|\alpha_t x_1,\sigma_t^2 \mathrm{I})$.

By substituting the definition we have just found of $u_t(x|x_1)$ in the definition of $u_t(x)$, we get:
$$
\begin{align*}
 u_t(x) &= \int u_t(x|x_1)\frac{p_t(x|x_1)q(x_1)}{p_t(x)} d x_1  \\
 &= \int \left(\frac{\dot{\alpha_t}}{\alpha_t}x + (\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1) \right) \frac{p_t(x|x_1)q(x_1)}{p_t(x)} d x_1 \\
 &= \int \left( \frac{\dot{\alpha_t}}{\alpha_t}x \right)\frac{p_t(x|x_1)q(x_1)}{p_t(x)} d x_1 + \int \left((\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1)  \right)\frac{p_t(x|x_1)q(x_1)}{p_t(x)} d x_1 \\
 &= \left( \frac{\dot{\alpha_t}}{\alpha_t}x \right) \int \underbrace{\frac{p_t(x|x_1)q(x_1)}{p_t(x)}}_{\frac{p_t(x)}{p_t(x)}=1} d x_1 + \left((\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\right)\int \underbrace{\nabla \log p_t (x|x_1) \frac{p_t(x|x_1)q(x_1)}{p_t(x)}}_{\text{What is this?}} d x_1 \\
\end{align*}
$$

To understand the second term, we have to analyze the score $\nabla \log p_t(x)$. Indeed, we can rewrite it by using the logarithm trick as follows:
$$
\begin{align*}
\nabla \log p_t (x) &= \frac{\nabla p_t(x)}{p_t(x)} &&\hspace{1.5cm} \text{using log-trick} \\
&= \nabla \int \frac{p_t(x|x_1)q(x_1)}{p_t(x)}d x_1 &&\hspace{1.5cm} \text{definition of prob. path}\\
&= \int  \frac{\nabla p_t(x|x_1)q(x_1)}{p_t(x)}d x_1 &&\\
&= \int  \nabla \log p_t(x|x_1) \frac{p_t(x|x_1)q(x_1)}{p_t(x)}d x_1 &&\hspace{1.5cm} \text{using log-trick}\\
\end{align*}
$$
Therefore we can see that the missing integral on the equation above is exactly $\nabla \log p_t (x)$. By substituting the definition, we get the relation between the velocity field and the score function, which is given by:
$$
\begin{align*}
u_t(x)= \frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t (x)
\end{align*}
$$

:::warning
**NOTE**: All the above derivations above rely on the fact that we are able to arrive to a definition of $u_t(x|x_1)$ in terms of $\nabla \log p_t (x|x_1)$. This is possible only because we are considering a conditional probability path that is Gaussian, i.e. $p_t(x|x_1) = \mathcal{N}(x|\alpha_t x_1,\sigma_t^2 \mathrm{I})$, which is possible if and only if the base distribution $q(x_0)$ is Gaussian. However, flow matching/stochastic interpolants can be used to transport any distribution $q(x_0)$ to any distribution $q(x_1)$. In this case, the probability path is still Gaussian, but it depends on both $x_0$ and $x_1$, i.e. $p_t(x|x_1, x_0)=\mathcal{N}(x|\mu_t(x_1,x_0), \sigma_t(x_1,x_0)^2\mathrm{I})$, but if we marginalize $x_0$ out, we don't get a Gaussian distribution.
:::

:::info
**NOTE**: In a lot of paper we found a definition using the derivative of certain logarithm. Indeed, if we look closely at the definition of $\frac{\dot{\alpha_t}}{\alpha_t}$ and $(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t}$ we can see that they reminds of the derivative of a logarithmic function. Indeed, if we can write $\frac{d \ln \alpha_t}{d t} = \frac{1}{\alpha_t}\dot{\alpha_t}$. The same way, if we consider the following $-\frac{1}{2}\frac{d \sigma_t^2}{dt} + \sigma_t^2 \frac{d \ln \alpha_t}{dt}=(-\sigma_t \dot{\sigma_t} + \sigma_t^2 \frac{\dot{\alpha_t}}{\alpha_t})=\frac{\sigma_t}{\alpha_t}(\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t})$. So I feel that at the end of appendix B of the Guided flow paper, they are missing a square kind of. The same quantity can also be written as $\sigma_t^2 \frac{d \ln(\alpha_t/\sigma_t)}{dt}$.

Therefore, we can defined the vector field in terms of the score in the following three equivalent ways:
$$
\begin{align*}
 u_t(x) &= \frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t (x)\\
 u_t(x) &= \frac{d \ln\alpha_t}{dt} x + \sigma^2 \frac{d \ln(\alpha_t/\sigma_t)}{dt} \nabla \log p_t (x) \\
  u_t(x) &= \frac{d \ln\alpha_t}{dt} x + \left(-\frac{1}{2}\frac{d \sigma_t^2}{dt} + \sigma_t^2 \frac{d \ln \alpha_t}{dt} \right)\nabla \log p_t (x) \\
\end{align*}
$$
:::

### Conditional velocity field $u_t(x|y)$ and $\nabla \log p_t(x|y)$

To show the connectuon between $u_t(x|y)$ and $\nabla \log p_t(x|y)$ we have to follow almost the same steps as we did above. 

In case of a certain conditioning observation $y$, the probability path and the velocity field are defined as follows:
$$
\begin{align*}
 p_t(x|y) &= \int p_t(x|x_1)q(x_1|y) d x_1 \\
 u_t(x|y) &= \int u_t(x|x_1)\frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)} d x_1
\end{align*}
$$
As before the trick is to rewrite the conditional velocity field $u_t(x|x_1)$ by using the fact that we are dealing with a Gaussian probability path $p_t(x|x_1)$. Therefore as before, we have that 
$$
\begin{align*}
 u_t(x|x_1)&= \frac{\dot{\alpha_t}}{\alpha_t}x + (\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1) 
\end{align*}
$$
We can also consider the conditional score $\nabla \log p_t (x|y)$ which can be rewritten following similar steps as before
$$
\begin{align*}
\nabla \log p_t (x|y) &= \frac{\nabla p_t(x|y)}{p_t(x|y)} &&\hspace{1.5cm} \text{using log-trick} \\
&= \nabla \int \frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)}d x_1 &&\hspace{1.5cm} \text{definition of prob. path}\\
&= \int  \frac{\nabla p_t(x|x_1)q(x_1|y)}{p_t(x|y)}d x_1 &&\\
&= \int  \nabla \log p_t(x|x_1) \frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)}d x_1 &&\hspace{1.5cm} \text{using log-trick}\\
\end{align*}
$$
<!-- We also know, as we mentioned above, that the velocity field in this case is given by 
\begin{align*}
 u_t(x|y) = \int u_t(x|x_1)\frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)} d x_1
\end{align*}

where the conditional velocity field $u_t(x|x_1)$ for a Gaussian probability path is given by Lipman et al. as

\begin{align*}
 u_t(x|x_1) = \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) + \dot{\alpha_t}x_1
\end{align*}

This can also be rewritten as follows *(I don't like that this trick can only be explained by the fact we want to recover the score in the Gaussian case)*:
\begin{align*}
 u_t(x|x_1) &= \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) + \dot{\alpha_t}x_1 \\
 &= \frac{\dot{\alpha_t}}{\alpha_t}x - \frac{\dot{\alpha_t}}{\alpha_t}x  + \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) + \dot{\alpha_t}x_1 \hspace{1.5cm} \text{revolutionary idea of adding 0} \\
 &= \frac{\dot{\alpha_t}}{\alpha_t}x + \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) - \frac{\dot{\alpha_t}}{\alpha_t}(x-\alpha x_1) \\
 &=  \frac{\dot{\alpha_t}}{\alpha_t}x - (x-\alpha x_1) \left( \frac{\dot{\alpha_t}}{\alpha_t} - \frac{\dot{\sigma_t}}{\sigma_t}\right)\\
 &= \frac{\dot{\alpha_t}}{\alpha_t}x  -  \frac{1}{\sigma_t \alpha_t}(x-\alpha x_1)(\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \\
 & = \frac{\dot{\alpha_t}}{\alpha_t}x + (\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1) 
\end{align*}
where in the last derivation we used the fact that $\nabla \log p_t (x|x_1) = -\frac{1}{\sigma_t^2}(x - \alpha_tx1)$ since $p_t (x|x_1) = \mathcal{N}(x|\alpha_t x_1,\sigma_t^2 I)$.

::: warning
**NOTE** In a lot of papers we find that the conditional probability path  $p_t (x|x_1)$ is defined as $\mathcal{N}(x|\mu_t(x_1), \sigma_t(x_1)^2I)$ and the conditional velocity field as $u_t(x|x_1) = \frac{\dot{\sigma_t(x_1)}}{\sigma_t(x_1)}(x-\mu_t(x_1)) + \dot{\mu_t(x_1)}$. Using this notation makes the derivation we are doing below more complicated as we need the mean to allow the following definition $\mu_t(x_1)=\alpha_t x_1$.
::: -->

By substituting the definition of $u_t(x|x_1)$ into $u_t(x|y)$, we get:
$$
\begin{align*}
 u_t(x|y) &= \int u_t(x|x_1)\frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)} d x_1  \\
 &= \int \left(\frac{\dot{\alpha_t}}{\alpha_t}x + (\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1) \right) \frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)} d x_1 \\
 &= \int \left( \frac{\dot{\alpha_t}}{\alpha_t}x \right)\frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)} d x_1 + \int \left((\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1)  \right)\frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)} d x_1 \\
 &= \left( \frac{\dot{\alpha_t}}{\alpha_t}x \right) \int \underbrace{\frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)}}_{\frac{p_t(x|y)}{p_t(x|y)}=1} d x_1 + \left((\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\right)\int \underbrace{\nabla \log p_t (x|x_1) \frac{p_t(x|x_1)q(x_1|y)}{p_t(x|y)}}_{\text{definition of } \nabla \log p_t (x|y)} d x_1 \\
 &= \frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t (x|y)
\end{align*}
$$
where we used the definition of $\nabla \log p_t(x|y)$ we found above.

:::info
**NOTE** This derivation is exactly the one of Zheng et al., which showed that we can write the conditional velocity field as follows  
$$
\begin{align*}
u_t (x|y) = a_t x + b_t \nabla \log p_t (x|y)
\end{align*}
$$
which in the case of a Gaussian probability path defined as $p_t(x|x_1) = \mathcal{N}(x|\alpha_t x_1,\sigma_t^2 I)$, it becomes
$$
\begin{align*}
    u_t (x|y) = \underbrace{\frac{\dot{\alpha_t}}{\alpha_t}}_{a_t} x + \underbrace{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t}}_{b_t} \nabla \log p_t (x|y)
\end{align*}
$$
:::

<!-- **What about the unconditional velocity field $u_t(x)$? How is it related to the unconditional score?**

We can follow the same steps and show that 

\begin{align*}
  u_t (x) = \frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t (x)

We can start as before as considering the score function
\begin{align*}
\nabla \log p_t (x) &= \frac{\nabla p_t(x)}{p_t(x)} &&\hspace{1.5cm} \text{using log-trick} \\
&= \nabla \int \frac{p_t(x|x_1)q(x_1)}{p_t(x)}d x_1 &&\hspace{1.5cm} \text{definition of prob. path}\\
&= \int  \frac{\nabla p_t(x|x_1)q(x_1)}{p_t(x)}d x_1 &&\\
&= \int  \nabla \log p_t(x|x_1) \frac{p_t(x|x_1)q(x_1)}{p_t(x)}d x_1 &&\hspace{1.5cm} \text{using log-trick}\\
\end{align*}

In this case the unconditional velocity field is given by
\begin{align*}
 u_t(x) &= \int u_t(x|x_1)\frac{p_t(x|x_1)q(x_1)}{p_t(x)} d x_1
\end{align*}
where the conditional velocity field is the same as the one we have seen above, i.e. 
\begin{align*}
 u_t(x|x_1) &= \frac{\dot{\sigma_t}}{\sigma_t}(x-\alpha_t x_1) + \dot{\alpha_t}x_1 \\
 &= \frac{\dot{\alpha_t}}{\alpha_t}x + (\dot{\alpha_t}\sigma_t - \alpha_t\dot{\sigma_t}) \frac{\sigma_t}{\alpha_t}\nabla \log p_t (x|x_1) 
\end{align*}

By plugging it in the definition of velocity field and follow the same step as we did above, we can show the relation between the score and the velocity field.

:::warning
**NOTE**: All the above derivations above rely on the fact that we are able to arrive to a definition of $ u_t(x|x_1)$ in terms of $\nabla \log p_t (x|x_1)$. This is possible only because we are considering a conditional probability path that is Gaussian, i.e. $p_t(x|x_1) = \mathcal{N}(x|\alpha_t x_1,\sigma_t^2 I)$, which is possible if and only if the base distribution $q(x_0)$ is Gaussian. However, flow matching/stochastic interpolants can be used to transport any distribution $q(x_0)$ to any distribution $q(x_1)$. In this case, the probability path is still Gaussian, but it depends on both $x_0$ and $x_1$, i.e. $p_t(x|x_1. x_0)=\mathcal{N}(x|\mu_t(x_1,x_0), \sigma_t(x_1,x_0)^2I)$, but if we marginalize $x_0$ out, we don't get a Gaussian distribution.
::: -->

### Guiding an unconditional velocity field
Let's assume we have a pre-trained velocity field $v_{\theta}(t,x_t)$. How can I guide it to sample an example from a specific class for example. In the section above we have shown that 
$$
\begin{align*}
  u_t (x) = \frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t (x)
\end{align*}
$$
We can also write the unconditional score $\nabla \log p_t (x)$ in terms of the velocity field $u_t(x)$:
$$
\begin{align*}
\nabla \log p_t (x) = \left(  u_t (x) - \frac{\dot{\alpha_t}}{\alpha_t} x \right) \frac{\alpha_t}{\sigma_t(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)}
\end{align*}
$$
In addition to that, if we want to sample an example $x$ conditioned on a specific observation $y$, we are interested in simulating the conditional vector field $u(x|y)$, which we don't have it available. However above we have seen that we can write it as 
$$
\begin{align*}
    u_t (x|y) &= \frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t (x|y)\\
    &=\frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \underbrace{\left[ \nabla \log p_t (x) + \nabla \log p_t(y|x)\right]}_{\text{using Bayes' rule}}\\
    &=\frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \left[ \underbrace{\left(  u_t (x) - \frac{\dot{\alpha_t}}{\alpha_t} x \right) \frac{\alpha_t}{\sigma_t(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)}}_{\text{def of }  \nabla \log p_t (x) } +\nabla \log p_t(y|x)  \right] \\
    &=\frac{\dot{\alpha_t}}{\alpha_t} x +  u_t (x) - \frac{\dot{\alpha_t}}{\alpha_t} x + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t(t|x) \\
    &=  u_t (x) + (\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t) \frac{\sigma_t}{\alpha_t} \nabla \log p_t(y|x)
\end{align*}
$$
::: success
**Example** In the most common setting, where we assume that $q(x_0)= \mathcal{N}(x_0|0,\mathrm{I})$, and the probability path can be expressed as $p(x|x_1)=\mathcal{N}(x|tx_1,(1-t)^2\mathrm{I}))$, i.e. we have that $\alpha_t=t$ and $\sigma_t=1-t$, then we can compute the unconditional velocity field and the conditional one as follows:
$$
\begin{align*}
u_t (x) &= \frac{1}{t} x + \frac{1-t}{t} \nabla \log p_t (x)\\
u_t (x|y) &= u_t(x) + \frac{1-t}{t} \nabla \log p_t (y|x)
\end{align*}
$$
where $\nabla \log p_t (y|x)$ can be an additional classifier trained on the interpolation $x$.
:::


### Inverse problems

Score based models are nice because there is a neat way to tackle inverse problems. In this cases, indeed, they allow to sample from $p(x_1|y)$ (note usually in diffusion this will be $p(x(0)|y)$) without the need to train a separate classifier. Indeed, we can write $p(x_1|y)$ as follows
$$
\begin{align*}
 p(y|x) &= \int p(y, x_1 | x) dx_1 = \int \underbrace{p(y|x_1)}_{\text{likelihood model}} \overbrace{p(x_1|x)}^{\text{most probable $x_1$ given noisy $x$}} d x_1 
\end{align*}
$$
where $p(y|x_1)$ is the likelihood model which we can compute easily and $p(x_1|x)$ is the distribution which given a noised $x$ gives us a distribution over the possible noiseless $x_1$. This distribution, despite not being available in closed form, can be approximated by moment matching. The mean can be obtained by using Tweedie’s formula (first introduced by Robbins):
$$
\begin{align*}
\hat{x}(x) = \mathbb{E}[x_1|x] = \frac{x+\sigma_t^2 \nabla_{x} \log p_t(x)}{\alpha_t}
\end{align*}
$$
Therefore, if we want to apply the same technique with flow matching, we have to compute the corresponding Tweedie's/Robbins' formula with the velocity field. To do so, one possibility is to use the equation that relates the score to the velocity field that we have introduced above. If we do so, we have a way to compute $\hat{x}(x)$ using a velocity field. We will derive the equation step-by-step.
$$
\begin{align*}
\hat{x}(x) &= \frac{x}{\alpha_t} + \frac{\sigma_t^2}{\alpha_t} \nabla_{x} \log p_t(x)\\
&=\frac{x}{\alpha_t} + \frac{\sigma^2(t)}{\alpha_t} \left(\left(  u_t (x) - \frac{\dot{\alpha_t}}{\alpha_t} x \right) \frac{\alpha_t}{\sigma_t(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)}\right) \\
&= \frac{x}{\alpha_t} + \frac{\sigma_t^2}{\alpha_t} \frac{\alpha_t}{\sigma_t}\left(  u_t (x) - \frac{\dot{\alpha_t}}{\alpha_t} x \right)\frac{1}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)}\\
&=\frac{x}{\alpha_t} + \sigma_t\left(  u_t (x) - \frac{\dot{\alpha_t}}{\alpha_t} x \right)\frac{1}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)}\\
&=\frac{x}{\alpha_t} +\frac{\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} u_t(x) - \frac{\dot{\alpha_t}}{\alpha_t} \frac{\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)}x \\
&=\frac{x}{\alpha_t} \left(1- \frac{\dot{\alpha_t}\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)}\right) + \frac{\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} u_t(x) \\
&= \frac{x}{\alpha_t}\left(\frac{\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t - \dot{\alpha_t}\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} \right) + \frac{\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} u_t(x) \\
&=\frac{x}{\alpha_t}\left(\frac{ - \alpha_t \dot{\sigma}_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} \right) + \frac{\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} u_t(x) \\
&= x \frac{ - \dot{\sigma}_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} + \frac{\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} u_t(x) \\
&=\frac{\sigma_t}{(\dot{\alpha_t} \sigma_t - \alpha_t \dot{\sigma}_t)} \left(u_t(x) - \frac{\dot{\sigma_t}}{\sigma_t}x \right)
\end{align*}
$$
Now we have a way to approximate the mean of $p(x_1|x)$. The covariance function can also be estimated via Tweedie's formula, although this require the computation of the Hessian:
$$
\begin{align*}
\text{Cov}[x_1|x] = \left[\frac{\sigma_t^2}{\alpha_t^2}(\mathrm{I} + \sigma_t^2 \nabla^2 \log p_t(x) \right] =\hat{\Sigma}(x)
\end{align*}
$$
Therefore we can now approximate $p(x_1|x)$ as a Gaussian distribution with mean $\hat{x}(x)$ and covariance $\hat{\Sigma}(x)$. In addition to that, if assume that we have an observation likelihood that is Gaussian, i.e. $p(y|x_1)=\mathcal{N}(y|\mathcal{A}(x_1), \sigma_y^2\mathrm{I})$, where $\mathcal{A}(x_1)$ is the observation model and $\sigma_y^2$ the likelihood variance. By doing so, then we can get a closed form approximation for $p(y|x)$ given by $\mathcal{N}(y|\mathrm{A} \hat{x}(x), A\hat{\Sigma}(x)A^T +  \sigma^2_y \mathbf{I})$. The computation of the Hessian can be problematic, in addition to that in our case we have to find a relationship between the velocity field and the Hessian. For this reason, different papers propose different approaches to approximate it simply by considering $\text{Cov}[x_1|x]=r_t^2\mathrm{I}$, where $r_t$ is a monotonically increasing function. Therefore the final approximation is given by $p(y|x) \approx \mathcal{N} \left(y|\mathrm{A} \hat{x}(x), (\sigma^2_y + r_t^2 \mathbf{I})\right)$

:::warning
**Alternative derivation** In Zheng et al. paper (Training-free linear image inversion paper), we have a different approach to derive the $\hat{x}(x)$ for the Tweedie's formula. They, indeed, decided to use the relationship between the velocity field and the score that is defined by using the derivatives of logarithms that we have presented above, i.e.
$$
\begin{align*}
 u_t(x) &= \frac{d \ln\alpha_t}{dt} x + \sigma^2 \frac{d \ln(\alpha_t/\sigma_t)}{dt} \nabla \log p_t (x) 
\end{align*}
$$
If we now re-write the relationship from the score perspective, we get
$$
\begin{align*}
 \nabla \log p_t (x) = \left( u_t(x) - \frac{d \ln\alpha_t}{dt} x\right) \left(\sigma^2 \frac{d \ln(\alpha_t/\sigma_t)}{dt} \right)^{-1}
\end{align*}
$$
Then we can insert this into the Tweedie's formula and then it's just applying calculus as we are showing by deriving it step-by-step:
$$
\begin{align*}
\hat{x}(x) &= \frac{x}{\alpha_t} + \frac{\sigma_t^2}{\alpha_t} \nabla_{x} \log p_t(x)\\
&= \frac{x}{\alpha_t} + \frac{\sigma_t^2}{\alpha_t} \left( u_t(x) - \frac{d \ln\alpha_t}{dt} x\right) \left(\sigma^2 \frac{d \ln(\alpha_t/\sigma_t)}{dt} \right)^{-1} \\
& = \frac{x}{\alpha_t} + \frac{1}{\alpha_t} \left( \frac{d \ln(\alpha_t/\sigma_t)}{dt}\right)^{-1}u_t(x) - \frac{1}{\alpha_t}\left(\frac{d \ln(\alpha_t/\sigma_t)}{dt} \right)^{-1} \frac{d \ln\alpha_t}{dt} x \\
&=\frac{x}{\alpha_t} \left(1-\left(\frac{d \ln(\alpha_t/\sigma_t)}{dt} \right)^{-1} \frac{d \ln\alpha_t}{dt} \right) + \frac{1}{\alpha_t} \left( \frac{d \ln(\alpha_t/\sigma_t)}{dt}\right)^{-1}u_t(x)\\
&=\frac{x}{\alpha_t} \left(1 - \frac{\frac{d \ln\alpha_t}{dt} }{\frac{d \ln(\alpha_t/\sigma_t)}{dt}} \right) +  \left(\alpha_t \frac{d \ln(\alpha_t/\sigma_t)}{dt}\right)^{-1}u_t(x)\\
&=\frac{x}{\alpha_t} \left(\frac{\frac{d \ln\alpha_t}{dt}  - \frac{d \ln\sigma_t}{dt} +\frac{d \ln\alpha_t}{dt} }{\frac{d \ln(\alpha_t/\sigma_t)}{dt}} \right) +  \left(\alpha_t \frac{d \ln(\alpha_t/\sigma_t)}{dt}\right)^{-1}u_t(x)\\
&=-\frac{x}{\alpha_t} \left(\frac{d \ln(\alpha_t/\sigma_t)}{dt} \right)^{-1}  \frac{d \ln\sigma_t}{dt}+  \left(\alpha_t \frac{d \ln(\alpha_t/\sigma_t)}{dt}\right)^{-1}u_t(x) \\
&= \left(\alpha_t \frac{d \ln(\alpha_t/\sigma_t)}{dt}\right)^{-1}u_t(x) - \left(\alpha_t\frac{d \ln(\alpha_t/\sigma_t)}{dt} \right)^{-1}  \frac{d \ln\sigma_t}{dt} x\\
&=\left(\alpha_t \frac{d \ln(\alpha_t/\sigma_t)}{dt}\right)^{-1}\left(u_t(x) -  \frac{d \ln\sigma_t}{dt} x \right)
\end{align*}
$$
:::

:::success
**Example** We now go back to the running example where $\alpha_t =t$ and $\sigma_t=1-t$ (and $\dot{\alpha_t}=1$ and $\dot{\sigma_t}=-11$, respectively). If we substitute them above, we get
$$
\begin{align*}
\hat{x}(x) &= (1-t)\left(u_t(x)+\frac{1}{1-t}x\right)\\
&= (1-t)u_t(x)+x
\end{align*}
$$
:::

### Probability flow ODE and recovering the SDE using the velocity field

Before jumping into the relationship between the velocity field and the SDE we have to introduce some background concept. We will try to do it in the simplest possible way. Let's start by considering the general form of an SDE (here for simplicity we assume $x\in\mathbb{R}$, i.e. $x$ is a scalar):
$$
\begin{align*}
dx = f(x,t) dt + g(t)dW
\end{align*}
$$
where $f(x,t)$ is the drift term and $g(t)$ (which sometimes can also depends on $x$, i.e. $g(x,t)$) is the diffusion term. Let us also assume that the initial condition $x_0$ is sampled from a certain distribution $p_0(x)$. Then the Fokker-Planck equation tells us how the probability distribution $p_t(x)$ evolves over time:
$$
\begin{align*}
\frac{\partial p_t(x)}{\partial t} = - \frac{\partial}{\partial x} \left(f(x,t)p_t(x)\right) + \frac{1}{2} g^2(t) \frac{\partial^2}{\partial x^2} p_t(x)
\end{align*}
$$
Let us now assume that we have an ODE, instead, with a specific form of velocity field, which is given by
$$
\begin{align*}
 \frac{dx}{dt} = h(x,t) \hspace{1.5cm} h(x,t) = f(x,t) - \frac{g(t)^2}{2}\frac{\partial }{\partial x}\log q_t(x) 
\end{align*}
$$
where the initial observations are sampled from $x_0 \sim q_0(x)$. The evolution of $q_t(x)$, the probability distribution associate with the dynamics, over time can be described by the continuity equation, which is given by
$$
\begin{align*}
\frac{\partial q_t(x)}{\partial t} &= -\frac{\partial}{\partial x}( h(x,t)q_t(x))\\
& =- \frac{\partial}{\partial x}((f(x,t) - \frac{g(t)^2}{2}\frac{\partial }{\partial x}\log q_t(x) )q_t(x))\\
&= -\frac{\partial}{\partial x} (f(x,t) q_t(x)) +  \frac{1}{2}g(t)^2\frac{\partial}{\partial x}(\frac{\partial }{\partial x}\log q_t(x)) q_t(x)\\
&= -\frac{\partial}{\partial x} (f(x,t) q_t(x)) +  \frac{1}{2}g(t)^2\frac{\partial}{\partial x}(\frac{1}{q_t(x)}\frac{\partial }{\partial x} q_t(x)) q_t(x) \\
&= -\frac{\partial}{\partial x} (f(x,t) q_t(x)) +  \frac{1}{2}g(t)^2\frac{\partial}{\partial x}\frac{\partial }{\partial x} q_t(x)\\
&= -\frac{\partial}{\partial x} (f(x,t) q_t(x)) +  \frac{1}{2}g(t)^2\frac{\partial^2}{\partial x^2} q_t(x)
\end{align*}
$$
By comparing this with the Fokker-Planck equation above, we can notice that both the SDE and the ODE has the same dynamics if $p_0(x) = q_0(x)$. The ODE is known as *Probability flow ODE*, and it is usually written as:
$$
\begin{align*}
 \frac{dx}{dt} = f(x,t) - \frac{1}{2}g^2(t)\nabla\log p_t(x) 
\end{align*}
$$
Everybody at this point they cite Kingma 2021 (Variational Diffusion Model paper), but I am not able to find where they actually define the following:
$$
\begin{align*}
f(x,t)=x\frac{d}{dt}\ln \alpha_t \hspace{2.5cm} g^2(t)=\frac{d \sigma_t^2}{dt} - 2 \sigma^2_t\frac{d}{dt}\ln \alpha_t
\end{align*}
$$
Therefore, the probability flow ODE can also be written as
$$
\begin{align*}
\frac{dx}{dt} &= f(x,t) - \frac{1}{2}g^2(t)\nabla\log p_t(x) \\
&= x\frac{d}{dt}\ln \alpha_t - \frac{1}{2} \left(\frac{d \sigma_t^2}{dt} - 2 \sigma^2_t\frac{d}{dt}\ln \alpha_t \right)\nabla\log p_t(x) \\
&=x\frac{d}{dt}\ln \alpha_t + \left(-\frac{1}{2}\frac{d \sigma_t^2}{dt} +   \sigma^2_t\frac{d}{dt}\ln \alpha_t\right)\nabla\log p_t(x)\\
&=u_t(x)
\end{align*}
$$
where in the last equation we used the relation between $u_t(x)$ and $\nabla\log p_t(x)$ we derived at the beginning.

:::warning
**Alternative and possibly simpler derivation** We can derive the same thing by following a different and maybe easier path. The derivation we have presented above, was given in the following [presentation/lecture](https://www.youtube.com/watch?v=qXXQcRsl6U8). However, we can derive the same conclusion by just rewriting the Fokker-Planck equation as we are going to see and then use the definition of divergence and its connection to the continuity equation. We mention different concepts in just two lines, but we are going to describe them briefly here before getting into the step-by-step derivation. We have seen above that the Fokker-Planck equation tells us the evolution of the probability $p_t(x)$ over time if it follows the dynamics described by the SDE. We can also see that it consists of two terms, the first one kind of describes the change of probability given by the drift, which is a deterministic function. The second term, instead, is related to the diffusion term of the SDE, and describes the change of probability given by the diffusion. Roughly speaking, an ODE is just a deterministic SDE, i.e. an SDE without the diffusion term. Therefore, the evolution of the porbability $p_t(x)$ following an ODE, is just given by the first term, i.e. $\frac{\partial p_t(x)}{\partial t} = - \frac{\partial}{\partial x} \left(f(x,t)p_t(x)\right)$, which is usually referred to as the *continuity equation*. Here we are reporting it for the scalar case, but in the high-dimensional case this is written as $\frac{\partial p_t(x)}{\partial t} = - \nabla\cdot\left(f(x,t)p_t(x)\right)$, where $\nabla\cdot F$ is the divergence operator. 
Now we have all the ingredients to show the alternative derivation. Let's start from the Fokker-Planck equation:
$$
\begin{align*}
\frac{\partial p_t(x)}{\partial t} &= - \frac{\partial}{\partial x} \left(f(x,t)p_t(x)\right) + \frac{1}{2} g^2(t) \frac{\partial^2}{\partial x^2} p_t(x) &&\\
&=-\frac{\partial}{\partial x} \left(f(x,t)p_t(x)\right) + \frac{1}{2} g^2(t) \frac{\partial}{\partial x}\frac{\partial}{\partial x} p_t(x) && \hspace{1cm}\text{just a rewriting}\\
&=-\frac{\partial}{\partial x} \left(f(x,t)p_t(x)\right) + \frac{1}{2} g^2(t) \frac{\partial}{\partial x}\frac{\partial}{\partial x}\log p_t(x) p_t(x) && \hspace{1cm}\text{log-trick $\nabla \log p(x) = \frac{1}{p(x)}\nabla p(x)$}\\
&=-\frac{\partial}{\partial x} \left[f(x,t) - \frac{1}{2} g^2(t) \frac{\partial}{\partial x}\log p_t(x) \right] p_t(x) && 
\end{align*}
which can be seen as a continuity equation of the following ODE:
\begin{align*}
 \frac{dx}{dt} &= F(x, t) \\
 &=f(x,t) - \frac{1}{2} g^2(t) \nabla\log p_t(x) 
\end{align*}
$$
Therefore, we show how we can express an SDE via an ODE, but we have to know the score $\nabla\log p_t(x)$. Then following the same reasoning we did above, we can show how we can link this to the vector field $u_t(x)$. If you are interested in learning more about the Fokker-Planck equation we suggest this [nice blogpost](https://www.peterholderrieth.com/blog/2023/The-Fokker-Planck-Equation-and-Diffusion-Models//). 
:::

### A different path to draw a connection between flow matching and score-based modelling

>I am not completely sure this is 100% correct, so do not draw any conclusion from this

A different path to get to the relationship between the vector field in flow matching and the score learned by score-based models can be derived by following Karras et al. approach. In the paper, they propose a different view of the probability flow ODE associated to a particular noising SDE and corresponding backword/denoising SDE. Before showing the relation, we take a detour and start from the usual SDE formulation of the noising process as introduced by Song et al.
$$
\begin{align*}
d\mathbf{x} = f(\mathbf{x},t)dt + g(t)dw_t,
\end{align*}
$$
where $f(\mathbf{x},t)$ is the drift, $g(t)$ the diffusion, and $w_t$ is a Wiener process. The drift and the diffusion usually depends on the type of the noising SDE we are considering, like if it is variance exploding or variance preserving, but usually in diffusion model we choose a drift term that is affine, meaning that $f(\mathbf{x},t)$ can be written ad $f(t)\mathbf{x}$. Therefore, the usual SDE we consider is given by
$$
\begin{align*}
d\mathbf{x} = f(t)\mathbf{x}dt + g(t)dw_t,
\end{align*}
$$
Since the drift is affine, then the perturbation kernel or noising kernel associated with this SDE has a closed form given by
$$
p_{0t}(\mathbf{x}(t)|\mathbf{x}(0)) = \mathcal{N}(\mathbf{x}(t); s(t)\mathbf{x}(0), s^2(t)\sigma(t)^2 I)
$$
where $s(t)$ and $\sigma(t)$ depends on the choice of the drift and the diffusion and are given by
$$
s(t) = \exp\left(\int_0^t f(\xi)d\xi \right) \hspace{2cm} \sigma(t) = \sqrt{\int_0^t \frac{g(\xi)^2}{s(\xi)^2}d\xi}
$$

:::danger
**NOTE** Now we are assuming that the perturbation kernel has the form $p_{0t}(\mathbf{x}(t)|\mathbf{x}(0)) = \mathcal{N}(\mathbf{x}(t); s(t)\mathbf{x}(0), s^2(t)\sigma(t)^2 I)$, while before we were considering $p(\mathbf{x}(t)|\mathbf{x}_1 = \mathcal{N}(\mathbf{x}(t); \alpha(t)\mathbf{x}_1, \sigma(t)^2 I)$. Therefore $\sigma$ is different from above, and in addition to that, while the base distribution is $p_T$ for diffusion models, in flow matching it is given by $p_0$.
:::

The marginal distribution $p_t(\mathbf{x})$, which is the one that the probability flow ODE wants to match for every time $t$ is given by
$$
p_t(\mathbf{x}) = \int_{\mathbb{R}^d} p_{0t}(\mathbf{x}|\mathbf{x}_0)p_{\text{data}}(\mathbf{x}_0)d\mathbf{x}_0
$$
and the probability flow ODE that actually obey this $p_t(\mathbf{x})$ is given by
$$
d\mathbf{x}= f(t)\mathbf{x} - \frac{1}{2} g^2(t) \nabla_{\mathbf{x}}\log p_t(\mathbf{x}) 
$$

However, the following probability flow ODE is defined in terms of the drift $f(t)$ and diffusion $g(t)$. It would be more helpful if the properties of the marginal distribution $p_t(\mathbf{x})$ that the ODE is trying to obey can be derived in terms of the $s(t)$ and $\sigma(t)$ that appear in the nosing kernel. In the paper, they show that is possible to define it in terms of $s(t)$ and $\sigma(t)$, and this is given by:
$$
d\mathbf{x} = \frac{\dot{s}(t)}{s(t)}\mathbf{x} -  s^2(t)\sigma(t)\dot{\sigma}(t)\nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right)
$$

:::info
**Derivation of the probability flow ODE in terms of $s(t)$ and $\sigma(t)$**
For completeness we will derive step by step the new formulation of the probability flow ODE, but the same derivations can be found in the Appendix of Karras et al paper.
Let us start by writing the marginal distribution in a different way (all the derivations we present here are actually reported in the appendix of Karras et al):
$$
\begin{align*}
p_t(\mathbf{x}) &= \int_{\mathbb{R}^d} p_{0t}(\mathbf{x}|\mathbf{x}_0)p_{\text{data}}(\mathbf{x}_0)d\mathbf{x}_0 && \\
&= \int_{\mathbb{R}^d} p_{\text{data}}(\mathbf{x}_0)[\mathcal{N}(\mathbf{x}(t); s(t)\mathbf{x}(0), s^2(t)\sigma(t)^2 I)]d\mathbf{x}_0 && \text{insert definition of $p_{0t}(\mathbf{x}|\mathbf{x}_0)$}\\
&=\int_{\mathbb{R}^d} p_{\text{data}}(\mathbf{x}_0)[s(t)^{-d}\mathcal{N}\left(\frac{\mathbf{x}(t)}{s(t)}; \mathbf{x}_0, \sigma(t)^2 I\right)]d\mathbf{x}_0 && \text{$\mathbf{x} = s(t)\mathbf{x}_0 + s(t)\sigma(t)\epsilon$ so $\frac{\mathbf{x}(t)}{s(t)}= \mathbf{x}_0 + \sigma(t)\epsilon$}\\
&=s(t)^{-d}\int_{\mathbb{R}^d} p_{\text{data}}(\mathbf{x}_0)[s(t)^{-d}\mathcal{N}\left(\frac{\mathbf{x}(t)}{s(t)}; \mathbf{x}_0, \sigma(t)^2 I\right)]d\mathbf{x}_0 &&\\
&= s(t)^{-d} \underbrace{[ p_{\text{data}} * \mathcal{N}(0, \sigma(t)^2I)]}_{\text{convolution, mollified version of the data}}\left(\frac{\mathbf{x}}{s(t)}\right)
\end{align*}
$$
By looking at the definition of $p_t(\mathbf{x})$ above, we can define the following compact terms:
$$
p(x;\sigma(t))=p_{\text{data}} * \mathcal{N}(0, \sigma(t)^2I) \hspace{1cm}\text{and}\hspace{1cm} p_t(\mathbf{x})=s(t)^{-d}p\left(\frac{\mathbf{x}}{s(t)}; \sigma(t)\right)
$$
We can therefore substitute the new definition of the marginal distribution $p_t(\mathbf{x})$ into the probability flow ODE and get the following:
$$
\begin{align*}
d\mathbf{x}&= f(t)\mathbf{x} - \frac{1}{2} g^2(t) \nabla_{\mathbf{x}}\log p_t(\mathbf{x}) &&\\
&= f(t)\mathbf{x} - \frac{1}{2} g^2(t) \nabla_{\mathbf{x}}\log s(t)^{-d}p\left(\frac{\mathbf{x}}{s(t)}; \sigma(t)\right) \\
&= f(t)\mathbf{x} - \frac{1}{2} g^2(t) [\underbrace{\nabla_{\mathbf{x}}\log s(t)^{-d}}_{=0} + \nabla_{\mathbf{x}} \log p\left(\frac{\mathbf{x}}{s(t)}; \sigma(t)\right)] \\
&= f(t)\mathbf{x} - \frac{1}{2} g^2(t) \nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)}; \sigma(t)\right) \\
\end{align*}
$$
We can now compute the drift $f(t)$ and the diffusion $g(t)$ coefficient in terms of  $s(t)$ and $\sigma(t)$. Let's start with $s(t)$:
$$
\begin{align*}
s(t) &= \exp\left(\int_0^t f(\xi)d\xi \right) \\
\log s(t) &= \left(\int_0^t f(\xi)d\xi \right)\\
\frac{d}{dt}\log s(t) &= \frac{d}{dt}\left(\int_0^t f(\xi)d\xi \right)\\
\frac{\dot{s}(t)}{s(t)} &= f(t)
\end{align*}
$$
while for $g(t)$ we get:
$$
\begin{align*}
\sigma(t) &= \sqrt{\int_0^t \frac{g(\xi)^2}{s(\xi)^2}d\xi} \\
\sigma^2(t) &= \int_0^t \frac{g(\xi)^2}{s(\xi)^2}d\xi \\
\frac{d}{dt}\sigma^2(t) &= \frac{d}{dt}\int_0^t \frac{g(\xi)^2}{s(\xi)^2}d\xi \\
2\sigma(t)\dot{\sigma}(t)&=\frac{g(t)^2}{s^2(t)}\\
\sqrt{2\sigma(t)\dot{\sigma}(t)}&=\frac{g(t)}{s(t)}\\
g(t)&=s(t)\sqrt{2\sigma(t)\dot{\sigma}(t)}
\end{align*}
$$
So by substituting those into the probability flow ODE then we can get a different version of it in terms of $s(t)$ and $\sigma(t)$:
$$
\begin{align*}
d\mathbf{x} &= f(t)x - \frac{1}{2} g^2(t) \nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right) \\
d\mathbf{x} &= \frac{\dot{s}(t)}{s(t)}\mathbf{x} - \frac{1}{2} s^2(t)2\sigma(t)\dot{\sigma}(t)\nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right) \\
d\mathbf{x} &= \frac{\dot{s}(t)}{s(t)}\mathbf{x} -  s^2(t)\sigma(t)\dot{\sigma}(t)\nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right) \\
\end{align*}
$$
:::

Therefore, now given a perturbation kernel, we have a way to describe the ODE that has the same marginals as the underlying SDE that is linked to that specific perturbation kernel. If we think about flow matching now, we are approximating a ODE and to do so we are using a probability path. Thus, if our base distribution $p_0$ is standard Gaussian, our velocity field is approximating exactly the probability flow ODE we have presented above, meaning that
$$
u_t(x) = \frac{\dot{s}(t)}{s(t)}\mathbf{x} -  s^2(t)\sigma(t)\dot{\sigma}(t)\nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right) 
$$

:::success
We try now to see if by considering the usual flow matching choice of having the following probability path $p(x|x_1)=\mathcal{N}(x;tx_1, (1-t)^2)$. While above we considered $\alpha_t=t$ and $\sigma_t=1-t$, now to follow Karras et al. framework, we have that $s(t)=t$, while $\sigma(t)=\frac{1-t}{t}$. From those we can simply compute also the derivatives $\dot{s}(t)=1$ and $\dot{\sigma}(t)=-\frac{1}{t^2}$. By substituting this in the relation between the velocity field and the score, we get:
$$
\begin{align*}
u_t(x) &= \frac{\dot{s}(t)}{s(t)}\mathbf{x} -  s^2(t)\sigma(t)\dot{\sigma}(t)\nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right)\\
&=\frac{1}{t}\mathbf{x} - t^2\frac{1-t}{t}\frac{-1}{t^2}\nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right)\\
&=\frac{1}{t}\mathbf{x} + \frac{1-t}{t}\nabla_{\mathbf{x}}\log p\left(\frac{\mathbf{x}}{s(t)};\sigma(t)\right)\\
\end{align*}
$$
which is the same we found also above, by following a different approach.
:::

**References**
- Lipman, Yaron, Ricky TQ Chen, Heli Ben-Hamu, Maximilian Nickel, and Matt Le. "Flow matching for generative modeling." ICLR 2023
- Zheng, Qinqing, Matt Le, Neta Shaul, Yaron Lipman, Aditya Grover, and Ricky TQ Chen. "Guided flows for generative modeling and decision making." arXiv preprint arXiv:2311.13443 (2023).
- Kingma, Diederik, Tim Salimans, Ben Poole, and Jonathan Ho. "Variational diffusion models." Advances in neural information processing systems 34 
- Pokle, Ashwini, Matthew J. Muckley, Ricky TQ Chen, and Brian Karrer. "Training-free linear image inversion via flows." arXiv preprint arXiv:2310.04432 (2023).
- Efron, B. Tweedie’s formula and selection bias. Journal of the American Statistical Association, 106, 2011.
- Robbins, H. E. An empirical bayes approach to statistics. In Breakthroughs in Statis- tics: Foundations and basic theory, pp. 388–394. Springer, 1992.
- Song, Y., Sohl-Dickstein, J., Kingma, D. P., Kumar, A., Ermon, S., & Poole, B. (2020). Score-based generative modeling through stochastic differential equations. _arXiv preprint arXiv:2011.13456.
- Karras, T., Aittala, M., Aila, T., & Laine, S. (2022). Elucidating the design space of diffusion-based generative models. _Advances in neural information processing systems_, _35_, 26565-26577.
